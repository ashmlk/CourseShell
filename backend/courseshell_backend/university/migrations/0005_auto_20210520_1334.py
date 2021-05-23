# Generated by Django 3.2.2 on 2021-05-20 13:34

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('university', '0004_university_uuid'),
    ]

    operations = [
        migrations.AddField(
            model_name='university',
            name='alpha_two_code',
            field=models.CharField(max_length=2, null=True),
        ),
        migrations.AddField(
            model_name='university',
            name='domains',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(blank=True, max_length=254), blank=True, null=True, size=10),
        ),
        migrations.AddField(
            model_name='university',
            name='web_pages',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(blank=True, max_length=254), blank=True, null=True, size=10),
        ),
    ]