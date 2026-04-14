import { auth } from "../app/auth";

export default async function getProducts() {
    const session = await auth();

    const token = session?.user?.accessToken;

    const res = await fetch(`${process.env.AUTH_API_URL}/products`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        console.error("Failed to fetch products:", res.status, res.statusText);
        return [];
    }

    const data = await res.json();
    return data.payload || [];
}
export async function getProductById(id) {
    const session = await auth();

    const token = session?.user?.accessToken;

    const res = await fetch(`${process.env.AUTH_API_URL}/products/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        console.error("Failed to fetch product:", res.status, res.statusText);
        return null;
    }

    const data = await res.json();
    return data.payload || null;
}

export async function getCategories() {
    const session = await auth();

    const token = session?.user?.accessToken;

    const res = await fetch(`${process.env.AUTH_API_URL}/categories`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        console.error("Failed to fetch categories:", res.status, res.statusText);
        return [];
    }

    const data = await res.json();
    return data.payload || [];
}

export async function getTopSellingProducts() {
    const session = await auth();

    const token = session?.user?.accessToken;

    const res = await fetch(
        `${process.env.AUTH_API_URL}/products/top-selling?limit=10`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        },
    );

    if (!res.ok) {
        console.error(
            "Failed to fetch top-selling products:",
            res.status,
            res.statusText,
        );
        return [];
    }

    const data = await res.json();
    return data.payload || [];
}

export async function rateProduct(productId, starValue) {
  const session = await auth();
  const token = session?.user?.accessToken;

  const url = `${process.env.AUTH_API_URL}/products/${productId}/rating?star=${starValue}`;

  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to submit rating");
  }

  return await res.json();
}

export async function getProductsByCategory(categoryId) {
    const session = await auth();

    const token = session?.user?.accessToken;
    const url = categoryId === "all" ? `${process.env.AUTH_API_URL}/products` : `${process.env.AUTH_API_URL}/categories/${categoryId}/products`;
    const res = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    },
    );

    if (!res.ok) {
        console.error(
            "Failed to fetch products by category:",
            res.status,
            res.statusText,
        );
        return [];
    }

    const data = await res.json();
    return data.payload || [];
}

export async function createProduct(data) {
  const session = await auth();
  const token = session?.user?.accessToken;

  const res = await fetch(`${process.env.AUTH_API_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name:        data.name,
      description: data.description,
      colors:      data.colors,   
      sizes:       data.sizes,  
      imageUrl:    data.imageUrl,
      price:       Number(data.price),
      categoryId:  data.categoryId,
    }),
  });

  const result = await res.json();
  return result.payload ?? null;
}

export async function updateProduct(productId, data) {
  const session = await auth();
  const token = session?.user?.accessToken;

  const res = await fetch(`${process.env.AUTH_API_URL}/products/${productId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name:        data.name,
      description: data.description,
      colors:      data.colors,
      sizes:       data.sizes,
      imageUrl:    data.imageUrl,
      price:       Number(data.price),
      categoryId:  data.categoryId,
    }),
  });

  const result = await res.json();
  return result.payload ?? null;
}

export async function deleteProduct(id) {
  const session = await auth();
  const token = session?.user?.accessToken;

  const res = await fetch(`${process.env.AUTH_API_URL}/products/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    console.error("Failed to delete product:", res.status, res.statusText);
    return false;
  }

  return true;
}

export async function getOrders(){
    const session = await auth();
    const token = session?.user?.accessToken;
    
    const res = await fetch(`${process.env.AUTH_API_URL}/orders`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    if (!res.ok) {
        console.error("Failed to fetch orders:", res.status, res.statusText);
        return [];
    }
    const data = await res.json();
    return data.payload || [];
}
export async function createOrder(orderData) {
    const session = await auth();
    const token = session?.user?.accessToken;

    const res = await fetch(`${process.env.AUTH_API_URL}/orders`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
    });

    if (!res.ok) {
        console.error("Failed to create order:", res.status, res.statusText);
        return null;
    }

    const data = await res.json();
    return data.payload || null;
}