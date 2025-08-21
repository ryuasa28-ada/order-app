// ページの読み込み完了時に実行されるイベントリスナーを登録
document.addEventListener('DOMContentLoaded', function() {
    // 「住所検索」ボタンをHTMLから取得
    var searchButton = document.getElementById('address-search');
    // 郵便番号を入力するフィールドをHTMLから取得
    var postalCodeInput = document.getElementById('postal-code');

    // 「住所検索」ボタンがクリックされたときの処理を定義
    searchButton.addEventListener('click', function() {
        var zipCode = postalCodeInput.value; // 入力された郵便番号を取得
        getAddress('postal-code', 'prefecture', 'city', 'address-details'); // 郵便番号と対応するIDを渡す
    });
});

// 郵便番号を引数にして住所情報を取得する関数
function getAddress(postalCodeId, prefectureId, cityId, addressDetailsId) {
    var postalCode = document.getElementById(postalCodeId).value;
    if (postalCode.length !== 7) {
        alert('正しい郵便番号を入力してください。');
        return;
    }

    fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${postalCode}`)
    .then(response => response.json())
    .then(data => {
        if (data.results) {
            document.getElementById(prefectureId).value = data.results[0].address1;
            document.getElementById(cityId).value = data.results[0].address2;
            document.getElementById(addressDetailsId).value = data.results[0].address3;
        } else {
            alert('該当する住所が見つかりません。郵便番号を確認してください。');
            clearAddressFields(prefectureId, cityId, addressDetailsId);
        }
    })
    .catch(error => {
        console.error('住所情報の取得に失敗しました', error);
        alert('住所情報の取得中にエラーが発生しました。');
        clearAddressFields(prefectureId, cityId, addressDetailsId);
    });
}

function clearAddressFields(prefectureId, cityId, addressDetailsId) {
    document.getElementById(prefectureId).value = '';
    document.getElementById(cityId).value = '';
    document.getElementById(addressDetailsId).value = '';
}

