from django.shortcuts import render #type: ignore
from django.http import JsonResponse 
from products.models import Product
from django.contrib.auth.decorators import login_required

# Create your views here.
@login_required
def pos(request):
    if request.htmx:
        return render(request, 'partials/products.html')
    return render(request, 'views/pos.html')

def products_api(request):
    products = Product.objects.filter(product_status="published")
    data = [
        {
            "id": p.id,
            "title": p.title,
            "category": getattr(p.category, "title", None),
            "image": getattr(p.image, "url", ""),
            "price": str(p.price),
            "qty": p.qty,
        }
        for p in products
    ]
    return JsonResponse(data, safe=False)

def order_history(request):
    if request.htmx:
        return render(request, 'partials/order-table.html')
    return render(request, 'views/orders.html')