import React, { useState } from 'react';

export default function ShoppingCart() {
  
  const [products] = useState([
    { id: 1, name: 'Wireless Headphones', price: 79.99, image: '🎧' },
    { id: 2, name: 'Coffee Mug', price: 12.99, image: '☕' },
    { id: 3, name: 'Notebook', price: 8.50, image: '📓' },
    { id: 4, name: 'Phone Charger', price: 24.99, image: '🔌' },
    { id: 5, name: 'Water Bottle', price: 15.99, image: '🚰' },
    { id: 6, name: 'Desk Lamp', price: 45.00, image: '💡' }
  ]);

  // Cart state - array of objects with product info + quantity
  const [cart, setCart] = useState([]);
  
  const addToCart = (product) => {
    const ExistingItem = cart.find(item => item.id === product.id)

    if(ExistingItem) {
      setCart(cart.map(item =>
        item.id === product.id 
        ? {...item, quantity:item.quantity + 1}
        :item
       ))
    }else {
      setCart([...cart, {product, quantity: 1}]);
    }
  }

  const removeFromCart = (productId) => {
    setCart(cart.filter(item=> item.id !== productId))
  }

  const updateQuantity =(productId, newQuantity) => {

    if (newQuantity === 0){
      removeFromCart(productId)
    }
    else {setCart(cart.map(item =>
      item.id === productId
      ? {...item, quantity:newQuantity }
      : item
   )) }

  }
  
  const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity),0);

    const totalItems = cart.reduce((total, item) => total + item.quantity,0);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ color: '#333', fontSize: '2.5rem', margin: '0' }}>
          🛒 Shopping Cart Demo
        </h1>
        <div style={{ 
          backgroundColor: '#f0f8ff', 
          padding: '10px 20px', 
          borderRadius: '25px', 
          display: 'inline-block',
          marginTop: '10px',
          border: '2px solid #4CAF50'
        }}>
          <strong>Cart: {totalItems} items | Total: ${totalPrice.toFixed(2)}</strong>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '40px' }}>
        
        {/* Products Section */}
        <div>
          <h2 style={{ color: '#333', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
            Available Products
          </h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '20px',
            marginTop: '20px'
          }}>
            {products.map((product) => (
              <div
                key={product.id}
                style={{
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  padding: '20px',
                  backgroundColor: 'white',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  textAlign: 'center'
                }}
              >
                <div style={{ fontSize: '3rem', marginBottom: '10px' }}>
                  {product.image}
                </div>
                <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>
                  {product.name}
                </h3>
                <p style={{ 
                  fontSize: '1.2rem', 
                  fontWeight: 'bold', 
                  color: '#2196F3',
                  margin: '0 0 15px 0'
                }}>
                  ${product.price.toFixed(2)}
                </p>
                <button
                  onClick={() => addToCart(product)}
                  style={{
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    transition: 'background-color 0.3s'
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#45a049'}
                  onMouseOut={(e) => e.target.style.backgroundColor = '#4CAF50'}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Cart Section */}
        <div>
          <h2 style={{ color: '#333', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
            Shopping Cart ({totalItems} items)
          </h2>
          
          {cart.length === 0 ? (
            <div style={{ 
              textAlign: 'center', 
              padding: '40px', 
              color: '#666',
              backgroundColor: '#f9f9f9',
              borderRadius: '8px',
              marginTop: '20px'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🛒</div>
              <p>Your cart is empty</p>
              <p style={{ fontSize: '0.9rem' }}>Add some products to get started!</p>
            </div>
          ) : (
            <>
              <div style={{ marginTop: '20px' }}>
                {cart.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      padding: '15px',
                      marginBottom: '10px',
                      backgroundColor: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '15px'
                    }}
                  >
                    <div style={{ fontSize: '2rem' }}>{item.image}</div>
                    
                    <div style={{ flex: 1 }}>
                      <h4 style={{ margin: '0 0 5px 0', color: '#333' }}>
                        {item.name}
                      </h4>
                      <p style={{ margin: '0', color: '#2196F3', fontWeight: 'bold' }}>
                        ${item.price.toFixed(2)} each
                      </p>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        style={{
                          backgroundColor: '#ff6b6b',
                          color: 'white',
                          border: 'none',
                          borderRadius: '50%',
                          width: '30px',
                          height: '30px',
                          cursor: 'pointer',
                          fontSize: '1.2rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        -
                      </button>
                      
                      <span style={{ 
                        minWidth: '30px', 
                        textAlign: 'center',
                        fontWeight: 'bold',
                        fontSize: '1.1rem'
                      }}>
                        {item.quantity}
                      </span>
                      
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        style={{
                          backgroundColor: '#4CAF50',
                          color: 'white',
                          border: 'none',
                          borderRadius: '50%',
                          width: '30px',
                          height: '30px',
                          cursor: 'pointer',
                          fontSize: '1.2rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        +
                      </button>
                    </div>

                    <div style={{ textAlign: 'right', minWidth: '80px' }}>
                      <div style={{ fontWeight: 'bold', color: '#333' }}>
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        style={{
                          backgroundColor: 'transparent',
                          color: '#ff6b6b',
                          border: 'none',
                          cursor: 'pointer',
                          fontSize: '0.8rem',
                          textDecoration: 'underline',
                          marginTop: '5px'
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cart Total */}
              <div style={{
                backgroundColor: '#f0f8ff',
                padding: '20px',
                borderRadius: '8px',
                border: '2px solid #2196F3',
                marginTop: '20px'
              }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginBottom: '15px'
                }}>
                  <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                    Total ({totalItems} items):
                  </span>
                  <span style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: 'bold', 
                    color: '#2196F3' 
                  }}>
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
                
                <button
                  style={{
                    width: '100%',
                    backgroundColor: '#2196F3',
                    color: 'white',
                    border: 'none',
                    padding: '15px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '1.1rem',
                    fontWeight: 'bold'
                  }}
                  onClick={() => alert(`Checkout - Total: $${totalPrice.toFixed(2)}`)}
                >
                  Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}