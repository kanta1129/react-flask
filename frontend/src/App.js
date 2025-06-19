import React, { useState, useEffect } from 'react';
import './App.css'; // 必要であればCSSファイルをインポート

function App() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // APIからデータを取得する副作用フック
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Flask APIのエンドポイント
                // Flaskがデフォルトで5000ポートで実行されていると仮定
                const response = await fetch('http://127.0.0.1:5000/api/products');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                setError(error);
                console.error("Failed to fetch products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []); // 空の依存配列は、コンポーネントのマウント時に一度だけ実行されることを意味します

    if (loading) {
        return <div className="container">Loading products...</div>;
    }

    if (error) {
        return <div className="container error-message">Error: {error.message}</div>;
    }

    return (
        <div className="container">
            <h1>商品リスト</h1>
            {products.length === 0 ? (
                <p>商品が見つかりませんでした。</p>
            ) : (
                <div className="product-list">
                    {products.map(product => (
                        <div key={product.id} className="product-item">
                            <h2>{product.name}</h2>
                            <p><strong>価格:</strong> ¥{product.price.toLocaleString()}</p>
                            <p><strong>説明:</strong> {product.description}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default App;