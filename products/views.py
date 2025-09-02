from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import Order, OrderItem, Product

# Create your views here.
@csrf_exempt
def create_order(request):
    if request.method == "POST":
        data = json.loads(request.body)
        customer = data.get("customer")
        comment = data.get("comment")
        payment = data.get("payment")
        total = data.get("total")
        items = data.get("items", [])
        user = request.user if request.user.is_authenticated else None

        # Create main order
        order = Order.objects.create(
            order_by=user,
            customer=customer,
            comment=comment,
            totalcost=total,
            mode_payment=payment,
        )

        # Create order items
        for i in items:
            prod = Product.objects.get(id=i["product"])
            OrderItem.objects.create(
                order=order,
                product=prod,
                qty=i["qty"],
                price=i["price"],
            )

        return JsonResponse(
            {"message": "Order placed successfully", "order_id": order.id}, status=201
        )

    return JsonResponse({"error": "Invalid request"}, status=400)