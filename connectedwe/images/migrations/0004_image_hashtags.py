# Generated by Django 2.0.7 on 2018-07-26 09:17

from django.db import migrations
import taggit.managers


class Migration(migrations.Migration):

    dependencies = [
        ('taggit', '0002_auto_20150616_2121'),
        ('images', '0003_auto_20180725_1852'),
    ]

    operations = [
        migrations.AddField(
            model_name='image',
            name='hashtags',
            field=taggit.managers.TaggableManager(help_text='A comma-separated list of tags.', through='taggit.TaggedItem', to='taggit.Tag', verbose_name='Tags'),
        ),
    ]
