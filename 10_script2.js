// Navigation Bar 선택
const menuLinks = document.querySelectorAll(".navbar-area a");

menuLinks.forEach(link => {
    link.addEventListener("click", (event) => {
        //event.preventDefault();
        //if (!link.classList.contains("active")) {
            removeActiveClass();
            link.classList.add("active");
       	//}
    });
});

function removeActiveClass() {
    menuLinks.forEach(link => {
        link.classList.remove("active");
    });
}

// Table Order
$(document).ready(function() {
    function displayMenu(type){
	$('.admin-area').removeClass('visible');
        
	$.ajax({
            url: "10_index2.php",
            type: "GET",
            data: { table: "menulist", type: type },   // type값도 서버에 >    보내줌
            success: function(response) {
                $("#dbArea").html(response);            // db-area 영역 menu-container

                // 메뉴 항목에 대한 클릭 이벤트 핸들러를 추가
                $(document).off('click', '.menu-item');
                $(document).on('click', '.menu-item', function() {
                    const menuName = $(this).find('.menu').text();
                    const menuPrice = Number($(this).find('.price').text());

                    addToCart(menuName,menuPrice);
                });
            },
            error: function(xhr, status, error) {
                console.error(error);
            }
        });
    }

    // 주문 시작
    $('.order-box').click(function() {
	event.preventDefault();

        $('#orderArea').hide();
        $('#menuArea').show();

	console.log("Order Start!!");
	const orderID = generateOrderNumber();
	$('#order-number').text(orderID);

        const defaultType = "";
        $(".navbar-area a[data-type='" + defaultType + "']").addClass("activ    e");
        displayMenu(defaultType);
    });

    $(".navbar-area a").on("click", function(event) {
	$("#shop-area").show();

	const href= $(this).attr('href');
	if (href !== '#AdminMode'){
            event.preventDefault();
            let type = $(this).data("type");
	    if (href === '#pick') {
	    	type = 'pick';
	    }
            displayMenu(type);
	}
    });

    // 장바구니 수량 조정
    $('#cart').on('click', '.increase', function() {
        let quantityElement = $(this).siblings('.quantity');
        let quantity = parseInt(quantityElement.text());
        quantityElement.text(quantity + 1);

        updatePrice();
    });
    $('#cart').on('click', '.decrease', function() {
        let quantityElement = $(this).siblings('.quantity');
        let quantity = parseInt(quantityElement.text());
        if (quantity > 1) {
            quantityElement.text(quantity - 1);
        } else {
            $(this).closest('.cart-item').remove();
        }

	updatePrice();
    });

    // 주문
    $('#orderButton').click(function() {
    	var cartItems = $(".cart-item");

    	var order = {
            orderID: $('#order-number').text(),
            items: []
    	};

    	cartItems.each(function() {
            var item = {
            	menu: $(this).find(".menu-name").text(),
            	quantity: $(this).find(".quantity").text()
            };
            order.items.push(item);
   	});

    	// 주문 정보를 서버에 전송
    	$.ajax({
            url: '10_cart.php',
            type: 'POST',
            data: JSON.stringify(order),
            contentType: 'application/json; charset=utf-8',
            success: function(response) {
            	console.log(response);
            },
            error: function(error) {
            	console.log(error);
            }
    	});

    	// 초기 화면으로
	$('.cart-item').not(':first').remove();
    	$('#menuArea').hide();
    	$('#orderArea').show();	
	$('#total-price').text(0);
    });

    // Admin Mode !!! Insert, Alter, Delete 아직 구현 안함..
    let targetAlterID;
    let targetDeleteID;

    // 관리자모드 실행
    function adminMode() {
    	$('.navbar-area a').removeClass('active');
    	$('#dbArea').empty();
	$("#shop-area").hide();
	$('#admin-area').addClass('visible');

    	$.ajax({
            url: "10_index2.php?type=AdminMode",
            type: "GET",
            success: function(data) {
            	$('#dbArea').html(data);
            },
            error: function(request, status, error) {
            	console.log("code: "+request.status+"\n"+"message: "+request.responseText+"\n"+"error: "+error);
            }
	});
    }
    $('a[href="#AdminMode"]').click(function(e) {
	var passwd = prompt("Input Administrator Password");
	if (!passwd || passwd !== 'net123'){
	    alert("Wrong Password...");
	    return;
	} else {
    	    e.preventDefault();
    	    adminMode();
	}
    });

    // Insert
    $("#insertButton").click(function() {
	$("#inputForm").show();
	$("#alterForm").hide();
	$("#deleteForm").hide();
    });
    $("#addMenuButton").click(function(){
	var menu = $("#menuInput").val();
	var price = $("#priceInput").val();
	var type = $("#typeInput").val();

	$.ajax({
	    url: "10_insert.php",
	    type: "POST",
	    data: {
		menu: menu,
		price: price,
		type: type
	    },
	    success: function(response) {
		$("#inputForm").hide();
		adminMode();
	    }
	});
    });
});

function generateOrderNumber() {
    return Math.floor(Math.random() * 100)+1;
}

// 장바구니에 메뉴 추가
function addToCart(menuName, menuPrice) {
    let cartItem = $('#cart .cart-item').first().clone(true);

    cartItem.find('.menu-name').text(menuName);
    cartItem.find('.item-price').text(menuPrice);
    cartItem.find('.single-price').text(menuPrice);

    $('#cart').append(cartItem);

    cartItem.show();
    updatePrice();
}

// 장바구니 가격 업데이트
function updatePrice() {
    let grandTotal = 0;

    $('.cart-item').each(function() {
        const quantity = parseInt($(this).find('.quantity').text());
        const singlePrice = parseInt($(this).find('.single-price').text());
        const totalPrice = singlePrice * quantity;

	if (!isNaN(totalPrice)) {
            $(this).find('.item-price').text(totalPrice);
	    grandTotal += totalPrice;
	}
    });

    $('#total-price').text(grandTotal);
}

//orderlist DB 삭제
document.getElementById('orderdeleteButton').addEventListener('click', function() {
    fetch('10_orderlistDelete.php', {
        method: 'POST',
    })
    .then(response => response.text())
    .then(data => console.log(data))
    .catch((error) => {
        console.error('Error:', error);
    });
});

// 채팅 화면 전환 버튼
document.querySelector('.voice-box').addEventListener('click', function() {
    document.querySelector('.chat-area').style.display = 'none';
    document.querySelector('.chatdisplay-area').style.display = 'block';
});

// 채팅 기능 (chat-bot)
document.querySelector('#sendMessage').addEventListener('click', function() {
    const userMessage = document.querySelector('#userMessage').value;

    if (userMessage.trim() !== "") {
	addMessageToChat("user", userMessage);
	const botResponse = getBotResponse(userMessage);
	addMessageToChat("bot", botResponse);
    }

    document.querySelector('#userMessage').value = "";
});

function addMessageToChat(sender, message) {
    const chatMessage = document.querySelector('.chat-message');
    const messageDiv = document.createElement('div');
    messageDiv.className = sender;
    messageDiv.textContent = message;
    chatMessage.appendChild(messageDiv);
}

function getBotResponse(message) {
    switch(message) {
    	case "안녕":
	    return "안녕하세요!";
    	case "주문.":
	    setTimeout(function() {
	    	$('#orderButton').trigger('click');
		document.querySelector('.chat-message').innerHTML = '';
    		document.querySelector('.chat-area').style.display = 'block';
    		document.querySelector('.chatdisplay-area').style.display = 'none';
	    }, 3000);
	    return "주문이 완료되었습니다!";
	    break;
	default:
	    return "무슨 말인지 모르겠어요.";
    }
}
