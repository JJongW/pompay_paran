function q2() {
    // 1. hid 값을 가져온다.
    let hid = $('#hid').val();
    // 2. 만약 가져온 값에 2020이 있으면 (includes 이용하기 - 찾아보자!)
    if (hid.includes('2020')) {
        // 4. 가져온 값을 이용해 names-q3에 붙일 태그를 만든다. (let temp_html = `<li>${가져온 값}</li>`)
        let temp_html = `<li>${hid}</li>`;
        // 5. 만들어둔 temp_html을 names-q3에 붙인다.(jQuery의 $('...').append(temp_html)을 이용하면 굿!)
        $('#names-q3').append(temp_html);
    } else {
        // 3. 만약 학번이 아니면 '학번이 아닙니다.' 라는 얼럿 띄우기
        alert('학번을 입력해주세요.');
        return;
    }
}
function q3_remove() {
    // 1. names-q3의 내부 태그를 모두 비운다.(jQuery의 $('....').empty()를 이용하면 굿!)
    $('#names-q3').empty();
}