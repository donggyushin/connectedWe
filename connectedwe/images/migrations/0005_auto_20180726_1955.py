# Generated by Django 2.0.7 on 2018-07-26 10:55

from django.db import migrations
import taggit.managers


class Migration(migrations.Migration):

    dependencies = [
        ('images', '0004_image_hashtags'),
    ]

    operations = [
        migrations.AlterField(
            model_name='image',
            name='hashtags',
            field=taggit.managers.TaggableManager(blank=True, help_text='A comma-separated list of tags.', through='taggit.TaggedItem', to='taggit.Tag', verbose_name='Tags'),
        ),
    ]
