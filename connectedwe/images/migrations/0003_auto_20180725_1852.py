# Generated by Django 2.0.7 on 2018-07-25 09:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('images', '0002_auto_20180724_1626'),
    ]

    operations = [
        migrations.AlterField(
            model_name='image',
            name='file',
            field=models.ImageField(upload_to=''),
        ),
    ]
