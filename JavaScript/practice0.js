//자바 스크립트에서 변수를 선언할 때
// 변하지 않는 값은 CONST
// 변할 수 있는 값은 let
let name = "MIKE";
let name1 ="JUNWON";
const age = 26;
console.log(age);

const message = "i am student";
const message1 = 'I\'m student';
console.log(message1);

const message3 = 'i am ${age}';
// 1번 옆에 있는 `을 사용해야 함
const message4 = `i am ${24+2}살 입니다.`;
console.log(message4);

//숫자형
const age1 = 30;
const PI = 3.14;
console.log(1+2);
console.log(10-2);
console.log(3*2);
console.log(6/2);
console.log(6%4);

const x= 1/0;
console.log(x);

const y= name/2; //문자를 숫자로 나눴을 때
console.log(y); //NaN

//Boolean
//const a = True;
//const b = False;
console.log(name=="MIKe");
console.log(age>20);

//null과 undefined
//typeof 연산자
console.log(typeof 3);
console.log(typeof name);
console.log(typeof true);
console.log(typeof "xxx");
console.log(typeof null);  //object
console.log(typeof undefined);

const a = "나는";
const b = "입니다.";
console.log(a + " " + name + " " + b);

//대화상자  Node.ns에선 Web내장함수인 alert confirm 등 사용못함 하려면 res.send 로 리스폰 해서 사용해야함
//https://velog.io/@shitaikoto/Node.js-ReferenceError-alert-is-not-defined 참고 블로그
//alert(메세지 띄우기) prompt(입력받음) confirm(확인받음)
//const name2 = prompt("이름을 입력하세요.");
//const name2 = prompt("예약일을 입력해주세요.", "2024-03-");
//alert("환영합니다, " + name2 + "님");

//const isAdult = confirm("당신은 성인 입니까?");
//console.log(isAdult);

//자료형 변환
//const mathScore = prompt("수학 몇 점? ");
//const EnglishScore = prompt("영어 몇 점? ");
//const result = (mathScore + EnglishScore) / 2;
//console.log(result);
//이러면 오류 발생 -> prompt로 입력받은건 문자형 이기 때문에 9080이 되어 9080/2=4540이 되는데 문자열이 숫자로 나눠지게 된건 자동형변환이 적용되었기 때문이다. 조심해야한다.


/* 괄호안에 자료형 문자형으로 변환 
console.log(
String(3)
String(true)
)
*/

/*  괄호안에 숫자형 문자형으로 변환 (버그없는 코드를 위해 기억)
console.log(
Number(3),
Number(true),  -> 1
Number(abcd),  -> NaN
Number(undefined), -> NaN
Number(0) -> false
Number('0') -> true
Number('') -> false
Number(' ') -> true
Number(null) -> 0
)
*/

/*  괄호안에 자료형 불린형으로 변환
console.log(
Boolean(0),
Boolean(""),
Boolean(null).
Boolean(undefined),
Boolean(NaN)    -> 출력값 모두 false
)
*/

//비교연산자
