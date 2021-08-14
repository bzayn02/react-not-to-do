import { useState } from "react";
import { Container, Row, Col, Alert , Button} from "react-bootstrap";
import { AddTaskForm } from "./components/form/AddTaskForm";

import { TaskList } from "./components/task-lists/TaskList";
import { NotToDoList } from "./components/task-lists/NotToDoList";

import "./App.css";

const hrPwk = 168;
const App = () => {
	const [tasks, setTasks] = useState([]);
	const [badTasks, setBadTasks] = useState([]);
	const [error, setError] = useState(false);
	const [taskToDelete, setTaskToDelete]=useState([]);
	const [badTaskToDelete, setBadTaskToDelete] = useState([]);

	const taskHrs = tasks.reduce((subttl, itm) => subttl + +itm.hr, 0);
	const badHours = badTasks.reduce((subttl, itm) => subttl + +itm.hr, 0);
	const totalHrs = taskHrs + badHours;

	const addTaskList = frmDt => {
		if (hrPwk < totalHrs + +frmDt.hr) {
			setError(true);
		} else {
			error && setError(false);
			setTasks([...tasks, frmDt]);
		}
	};

	//1. create a function and pass to task list component
	//2. on button click, grab the index and pass the index to a function in the parent component
	const markAsBadList = i => {
		//3. take the task out of the task[] based on the index value we received
		const tempTask = [...tasks];
		const badTask = tempTask.splice(i, 1)[0];
		//4. put the taken out task item to the badtask[]
		setBadTasks([...badTasks, badTask]);
		setTasks(tempTask);
	};

	const markAsGoodList = i => {
		const tempBadList = [...badTasks];
		const goodTask = tempBadList.splice(i, 1)[0];
		setTasks([...tasks, goodTask]);
		setBadTasks(tempBadList);
	};


	//colelct indices of the task lsits  to be deleted.

	const handleOnTaskClicked = e => {
	
		
		const {checked, value} = e.target;
		console.log(checked, value)
		if (checked){
			setTaskToDelete([
				 ...taskToDelete, +value
			])
		}else {
				// const tempArg = [...taskToDelete]
				// tempArg.splice(value, 1)
				// setTaskToDelete(tempArg);
				const filterArg = taskToDelete.filter ((item) => item!== +value)
			setTaskToDelete(filterArg)
			}
			
		};

		//Delete item from task list only
		const deleteFromTaskList = () => {
			console.log(tasks, taskToDelete)
				const newArg = tasks.filter((item,i)=> !taskToDelete.includes(i))
					
				
				setTaskToDelete([])
				
					setTasks(newArg)
				}

				//from bad lsit
				const deleteFromBadTaskList = () => {
					console.log(tasks, taskToDelete)
						const newArg = badTasks.filter((item,i)=> !badTaskToDelete.includes(i))
							
						
						setBadTaskToDelete([])
						
							setBadTasks(newArg)
						}
	
//Delete a list from task lists and bad lists
		const handleOnDeleteItems = () => {
		
			deleteFromTaskList();
			deleteFromBadTaskList();
		};

		//list teh abd items indexx on checkbox click
		const handleOnBadTaskClicked=(e)=>{
			const {checked, value} =e.target
			if(checked){
				setBadTaskToDelete([
					...badTaskToDelete, +value
				])
			}
			else{
const filterArg= badTaskToDelete.filter((item)=> item !== +value)
setBadTaskToDelete(filterArg);
			}
		}

	return (
		<div className="main">
			<Container>
				<Row>
					<Col>
						<h1 className="text-center mt-5">Not To Do Task List</h1>
					</Col>
				</Row>
				<hr />
				<Row>
					<Col>
						{error && (
							<Alert variant="danger">
								You don't have enough hours to allocate this task
							</Alert>
						)}
					</Col>
				</Row>
				<AddTaskForm addTaskList={addTaskList} />
				<hr />
				<Row>
					<Col>
						<TaskList tasks={tasks} markAsBadList={markAsBadList} taskToDelete={taskToDelete}
						handleOnTaskClicked={handleOnTaskClicked}/>
					</Col>
					<Col>
						<NotToDoList
							badTasks={badTasks}
							markAsGoodList={markAsGoodList}
							badHours={badHours}
							handleOnBadTaskClicked={handleOnBadTaskClicked}
						/>
					</Col>
				</Row>
				
				<Row className="py-3">
					<Col>
						<Button variant="danger" onClick={handleOnDeleteItems}>Delete</Button>
					</Col>
				</Row>
				<Row>
					<Col>
						<Alert variant="info">
							Your total allocated hours = {totalHrs} / 168 hours per week
						</Alert>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default App;
