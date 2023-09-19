# import
from flask import Flask, request, jsonify, render_template
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import make_pipeline


### 추천형 챗봇 (머신러닝 모델) ###
# 학습 데이터
training_data = [
    ("안녕", "안녕하세요!"),
    ("메뉴 추천해줘", "스파게티가 인기메뉴입니다!"),
    ("영업 시간이 언제야?", "오전 9시부터 오후 10시까지입니다.")
]

# 모델 훈련
X_train = [x[0] for x in training_data]
y_train = [x[1] for x in training_data]

model = make_pipeline(CountVectorizer(), LogisticRegression()).fit(X_train, y_train)

### 트리형 챗봇 ###
# 사용자와의 대화를 추적하는 전역 변수
current_state = "initial"

# 트리형 로직
def tree_logic(user_message):
    global current_state

    if current_state == "initial":
        if "메뉴" in user_message:
            current_state = "menu"
            return "인기 메뉴는 스파게티입니다."
        else:
            current_state = "default"
            return "이해하지 못했습니다."

    return None


# Flask 앱 생성
app = Flask(__name__)

# AJAX를 사용한 챗봇
@app.route("/chat", methods=["POST"])
def chat_test():
    user_message = request.json["message"]
    
    # 사용자가 "메뉴 추천해줘" 라고 한 경우만 머신러닝 로직 사용
    if "메뉴 추천해줘" in user_message:
        response = model.predict([user_message])
        return jsonify({"response": response[0]})
    else:
        tree_response = tree_logic(user_message)
        return jsonify({"response": tree_response})

@app.route("/")
def chat_page():
    return render_template("chat.html")
