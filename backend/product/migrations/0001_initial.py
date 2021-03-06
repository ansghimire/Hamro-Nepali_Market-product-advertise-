# Generated by Django 4.0 on 2022-03-11 14:58

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('category_id', models.AutoField(primary_key=True, serialize=False)),
                ('category_name', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='ProductAttribute',
            fields=[
                ('attribute_id', models.AutoField(primary_key=True, serialize=False)),
                ('attribute_name', models.CharField(max_length=100, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='ProductType',
            fields=[
                ('type_id', models.AutoField(primary_key=True, serialize=False)),
                ('type_name', models.CharField(max_length=100)),
                ('attribute', models.ManyToManyField(to='product.ProductAttribute')),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='type', to='product.category')),
            ],
        ),
        migrations.CreateModel(
            name='ProductAttributeValue',
            fields=[
                ('attribute_value_id', models.AutoField(primary_key=True, serialize=False)),
                ('attribute_value', models.CharField(max_length=150)),
                ('product_attribute', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='attribVal', to='product.productattribute')),
            ],
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('product_id', models.AutoField(primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=255)),
                ('description', models.TextField()),
                ('price', models.PositiveIntegerField(null=True)),
                ('price_negotiable', models.BooleanField(null=True)),
                ('condition', models.CharField(choices=[('Brand New(not used)', 'Brandnew'), ('LIKE New(used few times)', 'Likenew'), ('Excellent', 'Excellent'), ('Not Working', 'Notworking')], max_length=100, null=True)),
                ('used_for', models.CharField(max_length=100, null=True)),
                ('owndership_document_provided', models.CharField(choices=[('Original Purchase Bill', 'Purchasebill'), ('Stamped waranty card', 'Warrantycard'), ('I do not have any document', 'Nocard')], max_length=150, null=True)),
                ('home_delivery', models.BooleanField(null=True)),
                ('delivery_area', models.CharField(choices=[('within my area', 'Myarea'), ('within my city', 'Mycity'), ('almost anywhere in nepal', 'Anywhere')], max_length=100, null=True)),
                ('warranty_type', models.CharField(choices=[('Dealer/Shop', 'Dealer'), ('Manufacturer/Importer', 'Manufacturer'), ('No Warranty', 'Nowarranty')], max_length=100, null=True)),
                ('warranty_period', models.CharField(max_length=100, null=True)),
                ('productattributevalues', models.ManyToManyField(related_name='attributeValue', to='product.ProductAttributeValue')),
                ('type', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='types', to='product.producttype')),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='accounts.useraccount')),
            ],
        ),
        migrations.CreateModel(
            name='Media',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('image_url', models.ImageField(upload_to='uploads/')),
                ('product', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='product', to='product.product')),
            ],
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('comment', models.TextField()),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='product.product')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='accounts.useraccount')),
            ],
        ),
    ]
