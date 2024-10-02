<template>
    <div class="container">
        <input type="radio" name="type" id="gosiwon" checked>
        <input type="radio" name="type" id="jachiroom">
        <input type="radio" name="type" id="sharehouse">

        <nav>
            <div class="slider"></div>
            <label class="gosiwon" for="gosiwon">
                고시원
            </label>
            <label class="jachiroom" for="jachiroom">
                자취방
            </label>
            <label class="sharehouse" for="sharehouse">
                공유주거공간
            </label>
        </nav>
    </div>
</template>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.7);
    }

nav {
    width: 700px;
    height: 35px;
    border-radius: 6px;
    display: flex;
    text-align: center;
    position: relative;
    overflow: visible;
    box-shadow: 0 15px 25px -7px rgba(9, 136, 183, 0.2);
}

@media (max-width: 700px) {
    nav {
        width: 100vw;
        height: 35px;
        border-radius: 0;
    }
}

nav::before {
    content: "";
    background: rgba(0, 0, 0, 0.7);
    width: 100%;
    height: 100%;
    z-index: -2;
    position: absolute;
    border-radius: 5px;
}

nav label {
    width: 100%;
    height: 100%;
    font-size: 16px;
    font-weight: 400;
    border-radius: 5px;
    margin: 0 5px;
    color: white;
    position: relative;
    z-index: 1;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex; 
    align-items: center; 
    justify-content: center;
}

@media (max-width: 480px) {
    nav label {
        font-size: 14px;
    }
}

@media (max-width: 370px) {
    nav label {
        margin: 0 14px;
    }
}

nav label:hover {
    color: white;
}

nav label i {
    margin-right: 4px;
}

/* 검색 분류 말풍선 슬라이더 */
nav .slider {
    position: absolute;
    height: 100%;
    width: 33.3%;
    background: white;
    left: 0;
    top: 0;
    transition: 0.45s ease;
    z-index: 0;
    border-radius: 5px;
}

nav .slider:after {
    content: '';
    position: absolute;
    bottom: -40px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 50px;
    border: 30px solid transparent;
    border-top-color: white;
    z-index: 1;
}

/* 슬라이더 & 색상 변경 */
#gosiwon:checked ~ nav label.gosiwon {
    color: black;
}
#jachiroom:checked ~ nav .slider {
    left: 33.3%;
}
#jachiroom:checked ~ nav label.jachiroom {
    color: black;
}
#sharehouse:checked ~ nav .slider {
    left: 66.6%;
}
#sharehouse:checked ~ nav label.sharehouse {
    color: black;
}
input[type="radio"] {
    display: none;
}
</style>