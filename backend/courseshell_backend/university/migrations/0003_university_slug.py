# Generated by Django 3.2.2 on 2021-05-10 00:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('university', '0002_auto_20210509_1827'),
    ]

    operations = [
        migrations.AddField(
            model_name='university',
            name='slug',
            field=models.SlugField(default='', max_length=254, verbose_name=''),
            preserve_default=False,
        ),
    ]
