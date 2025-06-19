from flask import Flask, jsonify
from flask_cors import CORS # CORS対応のため

app = Flask(__name__)
CORS(app) # 全てのオリジンからのアクセスを許可 (開発用。本番環境では制限推奨)

# ダミーの商品データ
products = [
    {"id": 1, "name": "スマートフォン", "price": 50000, "description": "最新の高性能スマートフォンです。"},
    {"id": 2, "name": "ノートパソコン", "price": 120000, "description": "軽量でパワフルなノートパソコンです。"},
    {"id": 3, "name": "ワイヤレスイヤホン", "price": 15000, "description": "高音質で快適なワイヤレスイヤホンです。"},
    {"id": 4, "name": "スートウォッチ", "price": 30000, "description": "健康管理に役立つスマートウォッチです。"},
    {"id": 5, "name": "キーボード", "price": 8000, "description": "快適なタイピングができるメカニカルキーボードです。"},
]

@app.route('/api/products', methods=['GET'])
def get_products():
    """
    すべての商品リストをJSON形式で返します。
    """
    return jsonify(products)

if __name__ == '__main__':
    # デバッグモードで実行 (開発用。本番環境では無効にしてください)
    app.run(debug=True, port=5000)