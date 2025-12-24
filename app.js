// 天気アプリメインスクリプト - wttr.in API使用（完全無料・登録不要）

// wttr.in API設定（APIキー不要！）
const WTTR_API_URL = 'https://wttr.in';

// 日本の地名マッピング（wttr.in用）
const JAPANESE_LOCATIONS = {
    // 特別区（23区）
    '千代田区': 'Chiyoda,Tokyo',
    '中央区': 'Chuo,Tokyo',
    '港区': 'Minato,Tokyo',
    '新宿区': 'Shinjuku,Tokyo',
    '文京区': 'Bunkyo,Tokyo',
    '台東区': 'Taito,Tokyo',
    '墨田区': 'Sumida,Tokyo',
    '江東区': 'Koto,Tokyo',
    '品川区': 'Shinagawa,Tokyo',
    '目黒区': 'Meguro,Tokyo',
    '大田区': 'Ota,Tokyo',
    '世田谷区': 'Setagaya,Tokyo',
    '渋谷区': 'Shibuya,Tokyo',
    '中野区': 'Nakano,Tokyo',
    '杉並区': 'Suginami,Tokyo',
    '豊島区': 'Toshima,Tokyo',
    '北区': 'Kita,Tokyo',
    '荒川区': 'Arakawa,Tokyo',
    '板橋区': 'Itabashi,Tokyo',
    '練馬区': 'Nerima,Tokyo',
    '足立区': 'Adachi,Tokyo',
    '葛飾区': 'Katsushika,Tokyo',
    '江戸川区': 'Edogawa,Tokyo',
    
    // 市部
    '八王子市': 'Hachioji,Tokyo',
    '立川市': 'Tachikawa,Tokyo',
    '武蔵野市': 'Musashino,Tokyo',
    '三鷹市': 'Mitaka,Tokyo',
    '青梅市': 'Ome,Tokyo',
    '府中市': 'Fuchu,Tokyo',
    '昭島市': 'Akishima,Tokyo',
    '調布市': 'Chofu,Tokyo',
    '町田市': 'Machida,Tokyo',
    '小金井市': 'Koganei,Tokyo',
    '小平市': 'Kodaira,Tokyo',
    '日野市': 'Hino,Tokyo',
    '東村山市': 'Higashimurayama,Tokyo',
    '国分寺市': 'Kokubunji,Tokyo',
    '国立市': 'Kunitachi,Tokyo',
    '福生市': 'Fussa,Tokyo',
    '�江市': 'Akigawa,Tokyo',
    '東大和市': 'Higashiyamato,Tokyo',
    '清瀬市': 'Kiyose,Tokyo',
    '東久留米市': 'Higashikurume,Tokyo',
    '武蔵村山市': 'Musashimurayama,Tokyo',
    '多摩市': 'Tama,Tokyo',
    '稲城市': 'Inagi,Tokyo',
    '羽村市': 'Hamura,Tokyo',
    'あきる野市': 'Akiruno,Tokyo',
    '西東京市': 'Nishitokyo,Tokyo',
    
    // 郡部
    '瑞穂町': 'Mizuho,Tokyo',
    '日の出町': 'Hinode,Tokyo',
    '檜原村': 'Hinohara,Tokyo',
    '奥多摩町': 'Okutama,Tokyo',
    '大島町': 'Oshima,Tokyo',
    '利島村': 'Toshima,Tokyo',
    '新島村': 'Niijima,Tokyo',
    '神津島村': 'Kozushima,Tokyo',
    '三宅村': 'Miyake,Tokyo',
    '御蔵島村': 'Mikurajima,Tokyo',
    '八丈町': 'Hachioji,Tokyo',
    '青ヶ島村': 'Aogashima,Tokyo',
    '小笠原村': 'Ogasawara,Tokyo'
};

// 天気アイコンのマッピング（wttr.in 用）
const WEATHER_ICONS = {
    'Clear': '☀️', 'Sunny': '☀️',
    'Partly cloudy': '⛅', 'Cloudy': '☁️', 'Overcast': '☁️',
    'Mist': '🌫️', 'Fog': '🌫️',
    'Light rain': '🌦️', 'Rain': '🌧️', 'Heavy rain': '🌧️',
    'Thunderstorm': '⛈️',
    'Light snow': '🌨️', 'Snow': '❄️', 'Heavy snow': '❄️',
    'Sleet': '🌨️',
    'Hail': '🧊',
    'Hot': '🔥', 'Cold': '❄️',
    'Windy': '💨'
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
    const specialWards = Object.keys(JAPANESE_LOCATIONS).filter(name => 
        !['八王子市', '立川市', '武蔵野市', '三鷹市', '青梅市', '府中市', '昭島市', '調布市', '町田市', '小金井市', '小平市', '日野市', '東村山市', '国分寺市', '国立市', '福生市', '�江市', '東大和市', '清瀬市', '東久留米市', '武蔵村山市', '多摩市', '稲城市', '羽村市', 'あきる野市', '西東京市', '瑞穂町', '日の出町', '檜原村', '奥多摩町', '大島町', '利島村', '新島村', '神津島村', '三宅村', '御蔵島村', '八丈町', '青ヶ島村', '小笠原村'].includes(name)
    );
    
    // 市部
    const cities = Object.keys(JAPANESE_LOCATIONS).filter(name => 
        ['八王子市', '立川市', '武蔵野市', '三鷹市', '青梅市', '府中市', '昭島市', '調布市', '町田市', '小金井市', '小平市', '日野市', '東村山市', '国分寺市', '国立市', '福生市', '�江市', '東大和市', '清瀬市', '東久留米市', '武蔵村山市', '多摩市', '稲城市', '羽村市', 'あきる野市', '西東京市'].includes(name)
    );
    
    // 郡部
    const villages = Object.keys(JAPANESE_LOCATIONS).filter(name => 
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
        const errorType = error.message || 'UNKNOWN_ERROR';
        showError(errorType);
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
        const errorType = error.message || 'UNKNOWN_ERROR';
        showError(errorType);
        console.error('Weather refresh error:', error);
    }
}

// 天気データを取得（wttr.in API使用 - 完全無料）
async function fetchWeatherData(wardName) {
    const location = JAPANESE_LOCATIONS[wardName];
    if (!location) {
        throw new Error('Location not found');
    }
    
    try {
        // wttr.in APIからJSON形式で取得
        const weatherUrl = `${WTTR_API_URL}/${encodeURIComponent(location)}?format=j1`;
        const response = await fetch(weatherUrl);
        
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('LOCATION_NOT_FOUND');
            } else if (response.status === 429) {
                throw new Error('API_RATE_LIMIT');
            } else {
                throw new Error('API_ERROR');
            }
        }
        
        const weatherData = await response.json();
        
        // データを表示
        displayCurrentWeather(weatherData, wardName);
        displayForecast(weatherData);
        
    } catch (error) {
        // ネットワークエラーの処理
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
            throw new Error('NETWORK_ERROR');
        }
        throw error;
    }
}

// 現在天気を表示（wttr.in データ用）
function displayCurrentWeather(data, wardName) {
    const currentCondition = data.current_condition[0];
    const weatherDesc = currentCondition.weatherDesc[0].value;
    const icon = WEATHER_ICONS[weatherDesc] || getWeatherIcon(weatherDesc);
    const temperature = parseInt(currentCondition.temp_C);
    const feelsLike = parseInt(currentCondition.FeelsLikeC);
    const humidity = currentCondition.humidity;
    const windSpeed = currentCondition.windspeedKmph;
    const pressure = currentCondition.pressure;
    
    const weatherHTML = `
        <div class="weather-card">
            <div class="current-weather">
                <div class="weather-icon">${icon}</div>
                <div class="weather-details">
                    <h2>${wardName}</h2>
                    <div class="temperature">${temperature}°C</div>
                    <div class="description">${weatherDesc}</div>
                </div>
            </div>
            <div class="weather-stats">
                <div class="stat-item">
                    <div class="stat-label">体感温度</div>
                    <div class="stat-value">${feelsLike}°C</div>
                </div>
                <div class="stat-item">
                    <div class="stat-label">湿度</div>
                    <div class="stat-value">${humidity}%</div>
                </div>
                <div class="stat-item">
                    <div class="stat-label">風速</div>
                    <div class="stat-value">${windSpeed} km/h</div>
                </div>
                <div class="stat-item">
                    <div class="stat-label">気圧</div>
                    <div class="stat-value">${pressure} hPa</div>
                </div>
            </div>
        </div>
    `;
    
    weatherInfo.innerHTML = weatherHTML;
}

// 5日間予報を表示（wttr.in データ用）
function displayForecast(data) {
    const forecastDays = data.weather.slice(0, 5); // 5日間分
    
    const forecastHTML = `
        <div class="forecast-title">5日間天気予報</div>
        <div class="forecast-grid">
            ${forecastDays.map((day, index) => {
                const date = new Date();
                date.setDate(date.getDate() + index);
                const dayName = index === 0 ? '今日' : getDayName(date);
                const dateStr = `${date.getMonth() + 1}/${date.getDate()}`;
                
                const icon = WEATHER_ICONS[day.hourly[0].weatherDesc[0].value] || getWeatherIcon(day.hourly[0].weatherDesc[0].value);
                const temp = Math.round((parseInt(day.maxtempC) + parseInt(day.mintempC)) / 2);
                const desc = day.hourly[0].weatherDesc[0].value;
                
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

// 天気アイコンを取得（動的判定）
function getWeatherIcon(condition) {
    const conditionLower = condition.toLowerCase();
    
    if (conditionLower.includes('clear') || conditionLower.includes('sunny')) return '☀️';
    if (conditionLower.includes('cloud')) return '☁️';
    if (conditionLower.includes('rain')) return conditionLower.includes('heavy') ? '🌧️' : '🌦️';
    if (conditionLower.includes('snow')) return '❄️';
    if (conditionLower.includes('storm') || conditionLower.includes('thunder')) return '⛈️';
    if (conditionLower.includes('mist') || conditionLower.includes('fog') || conditionLower.includes('haze')) return '🌫️';
    if (conditionLower.includes('wind')) return '💨';
    if (conditionLower.includes('hot') || conditionLower.includes('heat')) return '🔥';
    if (conditionLower.includes('cold') || conditionLower.includes('chill')) return '❄️';
    
    return '🌤️'; // デフォルト
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

// エラー表示（wttr.in 用）
function showError(errorType) {
    let message = '';
    let details = '';
    
    switch(errorType) {
        case 'LOCATION_NOT_FOUND':
            message = '地名が見つかりません';
            details = '別の市区町村を選択してください。';
            break;
        case 'API_RATE_LIMIT':
            message = 'API利用制限に達しています';
            details = 'しばらく待ってから再試行してください。';
            break;
        case 'NETWORK_ERROR':
            message = 'ネットワークエラーが発生しました';
            details = 'インターネット接続を確認してください。';
            break;
        case 'API_ERROR':
            message = 'APIエラーが発生しました';
            details = 'しばらく待ってから再試行してください。';
            break;
        default:
            message = '天気データの取得に失敗しました';
            details = 'しばらく待ってから再試行してください。';
    }
    
    weatherInfo.innerHTML = `
        <div class="error">
            <h3>⚠️ ${message}</h3>
            <p>${details}</p>
            <div style="margin-top: 15px; padding: 10px; background: #e8f5e8; border-radius: 5px; font-size: 0.9rem; border: 1px solid #c3e6c3;">
                <strong>🌍 特徴:</strong><br>
                • 完全無料でAPIキー不要<br>
                • 登録やクレジットカード不要<br>
                • 62市区町村に対応<br>
                • リアルタイム天気情報
            </div>
        </div>
    `;
    forecastContainer.innerHTML = '';
}