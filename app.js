// 天気アプリメインスクリプト

// API設定 - 実際のAPIキーを設定してください
const API_KEY = 'YOUR_API_KEY_HERE'; // OpenWeatherMapのAPIキーを設定してください
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// 東京都の市区町村データ（緯度経度付き）
const TOKYO_WARDS = {
    // 特別区（23区）
    '千代田区': { lat: 35.6896, lon: 139.6917 },
    '中央区': { lat: 35.6702, lon: 139.7703 },
    '港区': { lat: 35.6587, lon: 139.7454 },
    '新宿区': { lat: 35.6896, lon: 139.6917 },
    '文京区': { lat: 35.7102, lon: 139.7570 },
    '台東区': { lat: 35.7098, lon: 139.7966 },
    '墨田区': { lat: 35.7100, lon: 139.8007 },
    '江東区': { lat: 35.6762, lon: 139.8303 },
    '品川区': { lat: 35.6095, lon: 139.7308 },
    '目黒区': { lat: 35.6419, lon: 139.6994 },
    '大田区': { lat: 35.5613, lon: 139.7177 },
    '世田谷区': { lat: 35.6462, lon: 139.6534 },
    '渋谷区': { lat: 35.6598, lon: 139.7006 },
    '中野区': { lat: 35.7102, lon: 139.6600 },
    '杉並区': { lat: 35.6775, lon: 139.6319 },
    '豊島区': { lat: 35.7295, lon: 139.7108 },
    '北区': { lat: 35.7548, lon: 139.7467 },
    '荒川区': { lat: 35.7360, lon: 139.7774 },
    '板橋区': { lat: 35.7765, lon: 139.7485 },
    '練馬区': { lat: 35.7359, lon: 139.6506 },
    '足立区': { lat: 35.7750, lon: 139.7910 },
    '葛飾区': { lat: 35.7345, lon: 139.8463 },
    '江戸川区': { lat: 35.7019, lon: 139.8147 },
    
    // 市部
    '八王子市': { lat: 35.6550, lon: 139.3390 },
    '立川市': { lat: 35.7138, lon: 139.4028 },
    '武蔵野市': { lat: 35.7031, lon: 139.5776 },
    '三鷹市': { lat: 35.6831, lon: 139.5586 },
    '青梅市': { lat: 35.7576, lon: 139.2568 },
    '府中市': { lat: 35.6619, lon: 139.4806 },
    '昭島市': { lat: 35.7208, lon: 139.3519 },
    '調布市': { lat: 35.6531, lon: 139.5447 },
    '町田市': { lat: 35.5403, lon: 139.4466 },
    '小金井市': { lat: 35.7019, lon: 139.4964 },
    '小平市': { lat: 35.7281, lon: 139.4800 },
    '日野市': { lat: 35.6550, lon: 139.3788 },
    '東村山市': { lat: 35.7503, lon: 139.4644 },
    '国分寺市': { lat: 35.7058, lon: 139.4466 },
    '国立市': { lat: 35.7339, lon: 139.4466 },
    '福生市': { lat: 35.7358, lon: 139.3264 },
    '�江市': { lat: 35.6317, lon: 139.5189 },
    '東大和市': { lat: 35.7347, lon: 139.3953 },
    '清瀬市': { lat: 35.7611, lon: 139.5278 },
    '東久留米市': { lat: 35.7506, lon: 139.5353 },
    '武蔵村山市': { lat: 35.7239, lon: 139.3781 },
    '多摩市': { lat: 35.6361, lon: 139.4664 },
    '稲城市': { lat: 35.6411, lon: 139.5031 },
    '羽村市': { lat: 35.7661, lon: 139.3131 },
    'あきる野市': { lat: 35.7317, lon: 139.2839 },
    '西東京市': { lat: 35.7244, lon: 139.5669 },
    
    // 郡部
    '瑞穂町': { lat: 35.7653, lon: 139.3531 },
    '日の出町': { lat: 35.7250, lon: 139.3278 },
    '檜原村': { lat: 35.6781, lon: 139.2219 },
    '奥多摩町': { lat: 35.8097, lon: 139.1661 },
    '大島町': { lat: 34.7853, lon: 139.3781 },
    '利島村': { lat: 34.5219, lon: 139.2789 },
    '新島村': { lat: 34.3864, lon: 139.2608 },
    '神津島村': { lat: 34.2019, lon: 139.1306 },
    '三宅村': { lat: 34.2067, lon: 139.3611 },
    '御蔵島村': { lat: 34.1133, lon: 139.6008 },
    '八丈町': { lat: 33.1106, lon: 139.7897 },
    '青ヶ島村': { lat: 32.4553, lon: 140.0156 },
    '小笠原村': { lat: 27.0925, lon: 142.1744 }
};

// 天気アイコンのマッピング
const WEATHER_ICONS = {
    '01d': '☀️', '01n': '🌙',
    '02d': '⛅', '02n': '☁️',
    '03d': '☁️', '03n': '☁️',
    '04d': '☁️', '04n': '☁️',
    '09d': '🌧️', '09n': '🌧️',
    '10d': '🌦️', '10n': '🌧️',
    '11d': '⛈️', '11n': '⛈️',
    '13d': '❄️', '13n': '❄️',
    '50d': '🌫️', '50n': '🌫️'
};

// DOM要素
const wardSelect = document.getElementById('ward-select');
const weatherInfo = document.getElementById('weather-info');
const forecastContainer = document.getElementById('forecast-container');
const refreshBtn = document.getElementById('refresh-btn');

// アプリ初期化
document.addEventListener('DOMContentLoaded', function() {
    initializeWardSelect();
    addEventListeners();
});

// 市区町村選択リストを初期化
function initializeWardSelect() {
    // 特別区を先に表示
    const specialWards = Object.keys(TOKYO_WARDS).filter(name => 
        !['八王子市', '立川市', '武蔵野市', '三鷹市', '青梅市', '府中市', '昭島市', '調布市', '町田市', '小金井市', '小平市', '日野市', '東村山市', '国分寺市', '国立市', '福生市', '�江市', '東大和市', '清瀬市', '東久留米市', '武蔵村山市', '多摩市', '稲城市', '羽村市', 'あきる野市', '西東京市', '瑞穂町', '日の出町', '檜原村', '奥多摩町', '大島町', '利島村', '新島村', '神津島村', '三宅村', '御蔵島村', '八丈町', '青ヶ島村', '小笠原村'].includes(name)
    );
    
    // 市部
    const cities = Object.keys(TOKYO_WARDS).filter(name => 
        ['八王子市', '立川市', '武蔵野市', '三鷹市', '青梅市', '府中市', '昭島市', '調布市', '町田市', '小金井市', '小平市', '日野市', '東村山市', '国分寺市', '国立市', '福生市', '�江市', '東大和市', '清瀬市', '東久留米市', '武蔵村山市', '多摩市', '稲城市', '羽村市', 'あきる野市', '西東京市'].includes(name)
    );
    
    // 郡部
    const villages = Object.keys(TOKYO_WARDS).filter(name => 
        ['瑞穂町', '日の出町', '檜原村', '奥多摩町', '大島町', '利島村', '新島村', '神津島村', '三宅村', '御蔵島村', '八丈町', '青ヶ島村', '小笠原村'].includes(name)
    );
    
    // 特別区グループを追加
    const specialWardsGroup = document.createElement('optgroup');
    specialWardsGroup.label = '特別区';
    specialWards.forEach(ward => {
        const option = document.createElement('option');
        option.value = ward;
        option.textContent = ward;
        specialWardsGroup.appendChild(option);
    });
    wardSelect.appendChild(specialWardsGroup);
    
    // 市部グループを追加
    const citiesGroup = document.createElement('optgroup');
    citiesGroup.label = '市';
    cities.forEach(city => {
        const option = document.createElement('option');
        option.value = city;
        option.textContent = city;
        citiesGroup.appendChild(option);
    });
    wardSelect.appendChild(citiesGroup);
    
    // 郡部グループを追加
    const villagesGroup = document.createElement('optgroup');
    villagesGroup.label = '町村';
    villages.forEach(village => {
        const option = document.createElement('option');
        option.value = village;
        option.textContent = village;
        villagesGroup.appendChild(option);
    });
    wardSelect.appendChild(villagesGroup);
}

// イベントリスナーを追加
function addEventListeners() {
    wardSelect.addEventListener('change', handleWardSelection);
    refreshBtn.addEventListener('click', handleRefresh);
}

// 市区町村選択時の処理
async function handleWardSelection(event) {
    const selectedWard = event.target.value;
    
    if (!selectedWard) {
        showPlaceholder();
        return;
    }
    
    try {
        showLoading();
        await fetchWeatherData(selectedWard);
    } catch (error) {
        showError('天気データの取得に失敗しました。しばらく待ってから再試行してください。');
        console.error('Weather fetch error:', error);
    }
}

// 更新ボタンの処理
async function handleRefresh() {
    const selectedWard = wardSelect.value;
    
    if (!selectedWard) {
        alert('市区町村を選択してください。');
        return;
    }
    
    try {
        showLoading();
        await fetchWeatherData(selectedWard);
    } catch (error) {
        showError('天気データの取得に失敗しました。');
        console.error('Weather refresh error:', error);
    }
}

// 天気データを取得
async function fetchWeatherData(wardName) {
    const coordinates = TOKYO_WARDS[wardName];
    if (!coordinates) {
        throw new Error('Location not found');
    }
    
    // 現在天気を取得
    const currentWeatherUrl = `${BASE_URL}/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${API_KEY}&units=metric&lang=ja`;
    const currentResponse = await fetch(currentWeatherUrl);
    
    if (!currentResponse.ok) {
        throw new Error(`Weather API error: ${currentResponse.status}`);
    }
    
    const currentWeather = await currentResponse.json();
    
    // 5日間予報を取得
    const forecastUrl = `${BASE_URL}/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${API_KEY}&units=metric&lang=ja`;
    const forecastResponse = await fetch(forecastUrl);
    
    if (!forecastResponse.ok) {
        throw new Error(`Forecast API error: ${forecastResponse.status}`);
    }
    
    const forecastData = await forecastResponse.json();
    
    // データを表示
    displayCurrentWeather(currentWeather, wardName);
    displayForecast(forecastData);
}

// 現在天気を表示
function displayCurrentWeather(data, wardName) {
    const weather = data.weather[0];
    const icon = WEATHER_ICONS[weather.icon] || '🌤️';
    const temperature = Math.round(data.main.temp);
    const description = weather.description;
    
    const weatherHTML = `
        <div class="weather-card">
            <div class="current-weather">
                <div class="weather-icon">${icon}</div>
                <div class="weather-details">
                    <h2>${wardName}</h2>
                    <div class="temperature">${temperature}°C</div>
                    <div class="description">${description}</div>
                </div>
            </div>
            <div class="weather-stats">
                <div class="stat-item">
                    <div class="stat-label">体感温度</div>
                    <div class="stat-value">${Math.round(data.main.feels_like)}°C</div>
                </div>
                <div class="stat-item">
                    <div class="stat-label">湿度</div>
                    <div class="stat-value">${data.main.humidity}%</div>
                </div>
                <div class="stat-item">
                    <div class="stat-label">風速</div>
                    <div class="stat-value">${data.wind.speed} m/s</div>
                </div>
                <div class="stat-item">
                    <div class="stat-label">気圧</div>
                    <div class="stat-value">${data.main.pressure} hPa</div>
                </div>
            </div>
        </div>
    `;
    
    weatherInfo.innerHTML = weatherHTML;
}

// 5日間予報を表示
function displayForecast(data) {
    // 5日間分のデータを毎日正午 기준으로抽出
    const dailyForecasts = {};
    
    data.list.forEach(item => {
        const date = new Date(item.dt * 1000);
        const dateKey = date.toDateString();
        
        // 正午のデータまたは最初のデータを使用
        if (!dailyForecasts[dateKey] || date.getHours() === 12) {
            dailyForecasts[dateKey] = item;
        }
    });
    
    const forecasts = Object.values(dailyForecasts).slice(0, 5);
    
    const forecastHTML = `
        <div class="forecast-title">5日間天気予報</div>
        <div class="forecast-grid">
            ${forecasts.map(forecast => {
                const date = new Date(forecast.dt * 1000);
                const dayName = getDayName(date);
                const dateStr = `${date.getMonth() + 1}/${date.getDate()}`;
                const icon = WEATHER_ICONS[forecast.weather[0].icon] || '🌤️';
                const temp = Math.round(forecast.main.temp);
                const desc = forecast.weather[0].description;
                
                return `
                    <div class="forecast-item">
                        <div class="forecast-date">${dayName}<br>${dateStr}</div>
                        <div class="forecast-icon">${icon}</div>
                        <div class="forecast-temp">${temp}°C</div>
                        <div class="forecast-desc">${desc}</div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
    
    forecastContainer.innerHTML = forecastHTML;
}

// 曜日名を取得
function getDayName(date) {
    const days = ['日', '月', '火', '水', '木', '金', '土'];
    return days[date.getDay()];
}

// ローディング表示
function showLoading() {
    weatherInfo.innerHTML = `
        <div class="loading">
            <div class="spinner"></div>
            <p>天気データを取得中...</p>
        </div>
    `;
    forecastContainer.innerHTML = '';
}

// プレースホルダー表示
function showPlaceholder() {
    weatherInfo.innerHTML = `
        <div class="placeholder">
            <p>市区町村を選択して天気予報を確認してください</p>
        </div>
    `;
    forecastContainer.innerHTML = '';
}

// エラー表示
function showError(message) {
    weatherInfo.innerHTML = `
        <div class="error">
            <p>${message}</p>
        </div>
    `;
    forecastContainer.innerHTML = '';
}