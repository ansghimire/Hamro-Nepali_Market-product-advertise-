from rest_framework.parsers import MultiPartParser, FormParser
# from django.db.models.query import QuerySet
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response
from rest_framework import status
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework.mixins import ListModelMixin, CreateModelMixin, UpdateModelMixin, DestroyModelMixin, RetrieveModelMixin
from .models import Product, ProductType, Category, ProductAttribute, ProductAttributeValue, Media
from .serializers import CategoryListSerializer, ProductSerializer, ProductTypeSerializer,CategorySerializier, ProductAttributeSerializer,ProductAttributeValueSerializer,SimpleProductAttibValSerializer, CategoryListSerializer, MediaSerializer,CommentSerializer

from rest_framework.permissions import IsAdminUser, AllowAny, IsAuthenticated
from rest_framework.decorators import action
from django.utils.timezone import now 
from django.utils import timezone
from datetime import timedelta
from django_celery_beat.models import PeriodicTask, CrontabSchedule
import json



class ProductViewSet(ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    # filter_backends = [DjangoFilterBackend]
    # filterset_fields = ['types___type_name']
    permission_classes = [IsAuthenticated]

    def get_permissions(self):
        if self.action == 'list':
            return [AllowAny()]
        if self.action == 'retrieve':
            return [AllowAny()]
        
        if self.action == 'comment_get':
            return [IsAuthenticated()]

        if self.action == "comment_create":
            return [IsAuthenticated()]

        return super().get_permissions()
    
    def perform_create(self, serializer):
        serializer.save()

        id = serializer.data.get('product_id')
        expire = int(serializer.data.get('expire'))
        current_date = timezone.localtime(now()) + timedelta(minutes=expire)
    
        schedule, created = CrontabSchedule.objects.get_or_create(hour=current_date.hour, minute=current_date.minute, day_of_month=current_date.day, month_of_year = current_date.month)
        
        task = PeriodicTask.objects.create(crontab=schedule, name='delete_product'+str(id), task='product.tasks.delete_after_expire', args=json.dumps(([id,])))



    @action(detail=True, url_path="comment")
    def comment_get(self, *args, **kwargs):
        # product_obj = get_object_or_404(Product, id=kwargs['id'])
        product_obj = self.get_object()
        comment_detail = product_obj.comment_set.all()
        print(product_obj)
        print(comment_detail)
        ser = CommentSerializer(comment_detail,many=True)
        print(ser.data)
        return Response(ser.data)
        
    
    @comment_get.mapping.post
    def comment_create(self, *args, **kwargs):
        # # product_obj = get_object_or_404(Product, id=kwargs['id'])
        product_obj = self.get_object()
        ser = CommentSerializer(data = self.request.data, context={'request':self.request, 'product_obj':product_obj})
        ser.is_valid(raise_exception=True)
        ser.save()
        return Response(ser.data)
    


    def get_queryset(self):
        querySet = Product.objects.all()
        # type_name = self.request.query_params.get('type-name')
        category = self.request.query_params.get('category')

        # if type_name:
        #     querySet = Product.objects.filter(type__type_name=type_name)

        if category:
            querySet = Product.objects.filter(type__category__category_name=category)[:4]

        return querySet



class ProductTypeViewSet(ModelViewSet):
    queryset = ProductType.objects.all()
    serializer_class = ProductTypeSerializer

    def get_permissions(self):
        if self.request.method == 'GET':
            return [AllowAny()]
        return [IsAdminUser()]
    

class CategoryViewSet(ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializier



    def get_permissions(self):
        if self.request.method == 'GET':
            return [AllowAny()]
        return [IsAdminUser()]
        
        

class ProductAttributeViewSet(ModelViewSet):
    queryset = ProductAttribute.objects.all()
    serializer_class = ProductAttributeSerializer
    permission_classes = [IsAdminUser]

    # def get_permissions(self):
    #     if self.request.method in  ['GET']:
    #         return [AllowAny()]
    #     return [IsAdminUser()]


class ProductAttributeValueViewSet(ModelViewSet):
    queryset = ProductAttributeValue.objects.all()
    serializer_class = ProductAttributeValueSerializer
    permission_classes = [IsAdminUser]

    # def get_permissions(self):
    #     if self.request.method in  ['GET']:
    #         return [AllowAny()]
    #     return [IsAdminUser()]


class CategoryListViewSet(ListModelMixin, RetrieveModelMixin, GenericViewSet):
    queryset = Category.objects.all()
    serializer_class = CategoryListSerializer


class MediaListViewSet(ModelViewSet):
    parser_classes = [MultiPartParser, FormParser]
    serializer_class = MediaSerializer
    queryset = Media.objects.all()
    filter_backends = [DjangoFilterBackend]
    filter_fields = ['product']
    permission_classes = [IsAuthenticated]


    def get_permissions(self):
        if self.request.method == 'GET':
            return [AllowAny()]
        return [IsAuthenticated()]


    def create(self, request, *args, **kwargs):
        product_id = request.data.get('product')
        
        media = Media.objects.filter(product_id = product_id)
        if len(media) > 3:
            return Response({'detail':"Unable to insert more than 3 image"}, status=status.HTTP_403_FORBIDDEN)
        serializer = self.get_serializer(data=request.data, context={'product_id':product_id, 'request':self.request})
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


from rest_framework.views import APIView

class SearchView(APIView):
      
      def post(self, request, format=None):

          queryset = Product.objects.all()
          data = self.request.data 

          category = data.get('category')
          if(category):
            queryset = queryset.filter(type__category__category_name=category)
        
          type = data.get('type')
          if(type):
            queryset = queryset.filter(type__type_name =type)

          condition = data.get('condition')
          if(condition):
            queryset = queryset.filter(condition__iexact=condition)

          min_price = data.get('min_price')
          max_price = data.get('max_price')

          if(min_price and max_price):
            queryset = queryset.filter(price__lte=max_price).filter(price__gte=min_price)
        
          negotiable = data.get('negotiable')

          if(negotiable):
              queryset = queryset.filter(price_negotiable=negotiable)

          ser = ProductSerializer(queryset, many=True)
          return Response(ser.data)




# # # testing celery ############
# from .tasks import test_func
# from django.http import HttpResponse

# def test(request):
#     test_func.delay()
#     return HttpResponse("Done")



        


          


    






