from django.shortcuts import get_object_or_404, render #type: ignore
from django.http import JsonResponse 
from django.views.decorators.http import require_POST
from products.models import Product, Order
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
    orders = Order.objects.prefetch_related("items", "items__product").all().order_by("-order_date")
    if request.htmx:
        return render(request, "partials/order-table.html", {"orders": orders})
    return render(request, "views/orders.html", {"orders": orders})

@require_POST
def update_order_status(request, order_id):
    order = get_object_or_404(Order, id=order_id)

    # Convert the string to a boolean
    paid_status = request.POST.get("paid_status")
    order.paid_status = True if paid_status == "true" else False
    order.save(update_fields=["paid_status"])

    # Return just the updated row partial
    return render(request, "partials/order-row.html", {"order": order})