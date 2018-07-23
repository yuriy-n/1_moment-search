import React , {Component} from 'react';


export default class MomentSearch extends Component {
	constructor (props) {
	super(props);
	this.state = {searchedText : "", items: [], visibleQuantity: 10};
	this.onChangeHandler = this.onChangeHandler.bind(this);
	this.showMore = this.showMore.bind(this);
	this.onClickHandlerTodo = this.onClickHandlerTodo.bind(this);
};

onChangeHandler(event) {
	this.setState({searchedText : event.target.value});
};
showMore() {
	this.setState({visibleQuantity: this.state.visibleQuantity + 10});
}

onClickHandlerTodo (index) {
	let newItems = this.state.items.map((item) => {
		if (index === item.id) {
			return Object.assign({}, item, {completed: !item.completed})
		};
		return item;
	});
	
	this.setState({items: newItems});
}	
componentDidMount(){
	fetch("https://jsonplaceholder.typicode.com/todos")
	.then(res => res.json())
	.then(res => this.setState({items: res}));
};
componentDidUpdate() {
	//console.log("componentDidUpdate:" + this.state.items[0].title)
}

render () {
	var context = this;
	return (
	<div>
	<SearchInput onChangeHandler={this.onChangeHandler} />
	<TodoList context={context} items={this.state.items} searchedText={this.state.searchedText} visibleQuantity={this.state.visibleQuantity} onClickHandlerTodo={this.onClickHandlerTodo}/>
	<button onClick={this.showMore}> Show more todos </button> 
	</div>
)
}
};

function SearchInput ({onChangeHandler}) {
	return (
		<div>	
		<input type="text" onChange={onChangeHandler} />

		</div>
		)
};

function TodoList({items, searchedText, visibleQuantity, onClickHandlerTodo, context}) {
	return (
		items.map((item, index) => {
			if (index >= visibleQuantity) return;
			return  item.title.toLowerCase().indexOf(searchedText.trim().toLowerCase()) !== -1 ? <Todo key = {item.id + "__" + item.userId} item={item} onClickHandlerTodo={onClickHandlerTodo.bind(context, item.id)}/>  : null
		})
	
		)
};
function Todo ({item, onClickHandlerTodo}) {
	let style = item.completed === true ? {"textDecoration": "line-through"} : null;
	return (
		<p style={style} onClick = {onClickHandlerTodo}>	
		{item.title}
		</p>


		)
};

// let visibleTodos = [];

// for (var i = 0; i <= visibleQuantity) {
// 	visibleTodos.push(<Todo key = {item.id + "__" + item.userId})

// }