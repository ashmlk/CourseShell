# Generated by Django 3.2.2 on 2021-05-09 22:17

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('university', '0002_auto_20210509_1827'),
    ]

    operations = [
        migrations.CreateModel(
            name='Course',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True, null=True)),
                ('modified_at', models.DateTimeField(auto_now=True, null=True)),
                ('code', models.CharField(max_length=50)),
                ('description', models.TextField(validators=[django.core.validators.MaxLengthValidator(1000)])),
                ('university', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='university.university', verbose_name='courses')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
