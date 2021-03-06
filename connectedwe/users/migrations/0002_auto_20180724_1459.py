# Generated by Django 2.0.7 on 2018-07-24 05:59

from django.db import migrations, models
import phonenumber_field.modelfields


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='bio',
            field=models.TextField(null=True, verbose_name='bio'),
        ),
        migrations.AddField(
            model_name='user',
            name='gender',
            field=models.CharField(choices=[('male', 'Male'), ('female', 'Female'), ('not-specified', 'Not Specified')], max_length=50, null=True, verbose_name='gender'),
        ),
        migrations.AddField(
            model_name='user',
            name='phone',
            field=phonenumber_field.modelfields.PhoneNumberField(max_length=128, null=True, verbose_name='phone'),
        ),
        migrations.AddField(
            model_name='user',
            name='website',
            field=models.URLField(null=True, verbose_name='webiste'),
        ),
    ]
