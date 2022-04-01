from celery import shared_task
from .models import Product

# @shared_task(bind=True)
# def test_func(self):
#     #operations
#     for i in range(10):
#         print(i)
#     return "Done"

@shared_task(bind=True)
def delete_after_expire(self, pr_id):
    obj= Product.objects.get(product_id=pr_id)  
    obj.delete()
    return "Successfully deleted"