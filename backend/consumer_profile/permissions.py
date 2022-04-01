from rest_framework import permissions

# it will be suitable only for review
class AuthorizedUser(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.review_user == request.user
        # return super().has_object_permission(request, view, obj)