const App = (
    <div>
        <h1>虚拟DOM</h1>
        <p>这是一个虚拟DOM的测试demo</p>
    </div>
);
console.log(App);
ReactDOM.render(
    App,
    document.querySelector("#app")
);