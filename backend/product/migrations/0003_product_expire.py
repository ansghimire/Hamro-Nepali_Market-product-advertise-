# Generated by Django 4.0 on 2022-03-31 06:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0002_product_quantity'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='expire',
            field=models.CharField(choices=[('5', '5 minutes'), ('10', '10 minutes'), ('15', '15 minutes'), ('20', '20 minutes')], default='5', max_length=3),
        ),
    ]
