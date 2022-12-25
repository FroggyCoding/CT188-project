// Jquery

// $(window).on('load',function(){
//   $('body').removeClass('preloading');
//   $('.loader').delay(1000).fadeOut('fast');
// });

$(document).ready(function () {
  $(".image-slider").slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: true,
    arrows: true,
    draggable: false,
    prevArrow: `<button type='button' class='slick-prev slick-arrow'><i class="fa-solid fa-chevron-left"></i></button>`,
    nextArrow: `<button type='button' class='slick-next slick-arrow'><i class="fa-solid fa-chevron-right"></i></button>`,
    dots: true,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          arrows: false,
          infinite: false,
        },
      },
    ],
    autoplay: true,
    autoplaySpeed: 1800,
  });
  $(".slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    arrows: true,
    draggable: false,
    prevArrow: `<button type='button' class='slick-prev slick-arrow'><i class="fa-solid fa-chevron-left"></i></button>`,
    nextArrow: `<button type='button' class='slick-next slick-arrow'><i class="fa-solid fa-chevron-right"></i></button>`,
    dots: true,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          arrows: false,
          infinite: false,
        },
      },
    ],
    autoplay: true,
    autoplaySpeed: 1800,
  });
  $('#eye').click(function(){
    $(this).toggleClass('open');
        $(this).children('i').toggleClass('fa-eye-slash fa-eye');
        if($(this).hasClass('open')){
            $(this).prev().attr('type', 'text');
        }else{
            $(this).prev().attr('type', 'password');
        }
    });
});

// Jquery
// Trang san pham
const btn = document.querySelectorAll(".add-cart");
btn.forEach(function(button,index){
  button.addEventListener("click",function(even){
    var btnItem = even.target;
    var product = btnItem.parentElement.parentElement;
    var productImg = product.querySelector("img").src;
    var productName = product.querySelector(".product-name").innerText;
    var productPrice = product.querySelector(".product-price span").innerText;
    // console.log(productPrice,productImg,productName);
    addcart(productPrice,productImg,productName);
  })
})

function addcart(productPrice,productImg,productName){
  var cartItem = document.querySelectorAll(".cart-item");
  var productT = document.querySelectorAll(".cart-name");
  var cartTable = document.querySelector("tbody");
  var check = true;
  var checkIndex = 0;
  for(var i =0;i<cartItem.length;i++){
    if(productT[i].innerHTML == productName){
      check=false;
      checkIndex = i;
    }
  }
  if(check==true){
    var addtr = document.createElement("tr");
    addtr.className = "cart-item";
    addtr.innerHTML = '<td class="cart-image"><img src="'+productImg+'" alt="" > </td><td class="cart-name">'+productName+'</td><td class="cart-price"><span class="text-danger">'+productPrice+'</span><sup>đ</sup></td><td class="cart-number"><input type="number" value="1" min="1" max="10"></td><td class="cart-button"><button>Xóa</button></td>';
    cartTable.append(addtr);
  }
  else{
    var prductP = productT[checkIndex].parentElement;
    var inputValue = prductP.querySelector("input");
    if(parseInt(inputValue.value,10)<10){
      inputValue.value= parseInt(inputValue.value,10)+1;
    }
  }
  deleteCart();
  carttotal();
  inputChange();
}

function carttotal(){
  var cartItem = document.querySelectorAll(".cart-item");
  var total = 0;
  var cartCount = 0;
  for(var i =0;i<cartItem.length;i++){
    var inputValue = cartItem[i].querySelector("input").value;
    // console.log(inputValue);
    var productPrice = cartItem[i].querySelector("span").innerHTML;
    // console.log(productPrice);
    cartCount += parseInt(inputValue,10);
    totalItem = parseInt(inputValue,10)*parseInt(productPrice,10)*1000000;
    total = total + totalItem;
  }
  var cartNumber = document.querySelector(".shopping-cart-icon");
  cartNumber.setAttribute('data-value', cartCount);
  // console.log(total.toLocaleString('de-DE'));
  var cartTotal = document.querySelector(".cart-total span");
  cartTotal.innerHTML = total.toLocaleString('de-DE');
}

function deleteCart(){
  var cartItem = document.querySelectorAll(".cart-item");
  for(var i =0;i<cartItem.length;i++){
    var productT = document.querySelectorAll(".cart-button button");
      productT[i].addEventListener("click",function(even){
        var cartDelete = even.target;
        var cartItemR = cartDelete.parentElement.parentElement;
        cartItemR.remove();
        carttotal();
      });
  }
}

function inputChange(){
  var cartItem = document.querySelectorAll(".cart-item");
  for(var i =0;i<cartItem.length;i++){
    var inputValue = cartItem[i].querySelector(".cart-number input");
      inputValue.addEventListener("change",function(even){
        carttotal();
      });
  }
}

const cartHide = document.querySelector(".fa-circle-xmark");
const cartShow = document.querySelector(".shopping-cart-icon");
cartShow.addEventListener("click",function(even){
  var right = document.querySelector(".shopping-cart").style.right;
  if(right == "0px")
    document.querySelector(".shopping-cart").style.right = "-100vw";
  else
    document.querySelector(".shopping-cart").style.right = "0"
})
cartHide.addEventListener("click",function(even){
    document.querySelector(".shopping-cart").style.right="-100vw";
})
// Trang san pham