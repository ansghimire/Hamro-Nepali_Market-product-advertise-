
from rest_framework.viewsets import ModelViewSet,  GenericViewSet
from rest_framework import permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.decorators import parser_classes
from rest_framework.mixins import UpdateModelMixin, RetrieveModelMixin
from .permissions import AuthorizedUser
from rest_framework import status

from .models import SavedList, UserProfile, Reviews
from .serializers import UserProfileSerializer, ReviewSerializer, SavedListSerializer



# for ads-listing
from product.serializers import ProductSerializer
from product.models import Product

class UserProfileViewSet(ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permissions_class = [permissions.IsAdminUser]

    def retrieve(self, request, *args, **kwargs):
        # if self.request.user == 'AnonymousUser':
        #     return super().retrieve(request, *args, **kwargs)

        user = self.request.user.profile.id
        if int(user) == int(kwargs['pk']):
            return Response({"error": "Visit your own profile"}, status=status.HTTP_400_BAD_REQUEST) 
        return super().retrieve(request, *args, **kwargs)

    def get_permissions(self):
        if self.action == 'retrieve':
            return [permissions.IsAuthenticated()]
        if self.action == 'own_profile':
            return [permissions.IsAuthenticated()]
        
        return [permissions.IsAdminUser()]
    
    
    #profile/me/
    @action(detail=False, url_path="me", methods=['GET', 'PUT'])
    @parser_classes([MultiPartParser, FormParser])
    def own_profile(self, *args, **kwargs):
        (customer,created,) = UserProfile.objects.get_or_create(user=self.request.user)
        
        if self.request.method == 'GET':
            serializer = UserProfileSerializer(customer)
            return Response(serializer.data)
        
        if self.request.method == 'PUT':
            serializer = UserProfileSerializer(customer, data = self.request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)

    #to show in login user profile  #profile/ads-listing
    @action(detail=False, url_path="ads-listing", permissions_class = [permissions.IsAuthenticated])
    def ads_listing_product(self, *args, **kwargs):
        user = self.request.user
        product = Product.objects.filter(user=user)
        ser = ProductSerializer(product, many=True)      
        return Response(ser.data)

    #to show listing of particular user to visitor  #profile/1/ads-listing-visitor
    @action(detail=True, url_path="ads-listing-visitor", permissions_class= [permissions.IsAuthenticated])
    def ads_listing_visitor(self, *args, **kwargs):
        user_obj = self.get_object()
        product_qs = Product.objects.filter(user= user_obj.id)
        ser = ProductSerializer(product_qs, many=True)      
        return Response(ser.data)

    #to show reviews for particular user   #profile/1/review/
    @action(detail=True, url_path="review", methods=['GET'], permissions_class=[permissions.IsAuthenticated])
    def review(self, *args, **kwargs):
        user_obj = self.get_object()

        if self.request.method == "GET":
            review_qs = user_obj.reviews_set.all()
            ser = ReviewSerializer(review_qs, many=True)
            return Response(ser.data)
        
        # if self.request.method == "POST":
        #     ser = ReviewSerializer(data=self.request.data, context={"request":self.request, "user_profile_obj":user_obj})
        #     ser.is_valid(raise_exception=True)
        #     ser.save()
        #     return Response(ser.data)

        

  
    #to show review done by me to others    #profile/1/review-by-me
    @action(detail=True, url_path="review-by-me", methods=['GET','PUT'], permissions_class=[permissions.IsAuthenticated])
    def review_by_me(self, *args, **kwargs):
        user_obj = self.get_object()
        (review, created) = Reviews.objects.get_or_create(review_user=self.request.user, user=user_obj)
        if self.request.method == 'GET':
            ser= ReviewSerializer(review)
            return Response(ser.data)
        
        if self.request.method == 'PUT':
            serializer = ReviewSerializer(review, data=self.request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)

    

        


class ReviewViewSet(GenericViewSet, RetrieveModelMixin):
    queryset = Reviews.objects.all()
    serializer_class = ReviewSerializer
    # permission_classes = [AuthorizedUser]
    def get_permissions(self):
        if self.action == 'retrieve':
            return [permissions.IsAuthenticated()]
        return [permissions.IsAuthenticated()]
    
    @action(detail=False, url_path='me')
    def review_me(self, *args, **kwargs):
        user = self.request.user
        review_qs = Reviews.objects.filter(user= user.id)
        ser = ReviewSerializer(review_qs, many=True)
        return Response(ser.data)

   

class SavedListViewset(ModelViewSet):
    queryset = SavedList.objects.all()
    serializer_class = SavedListSerializer
    permission_classes = [permissions.IsAuthenticated]


    def get_queryset(self):
        qs = SavedList.objects.filter(user= self.request.user)
        return qs

    def perform_create(self, serializer):
        return serializer.save(user=self.request.user)

    


        




