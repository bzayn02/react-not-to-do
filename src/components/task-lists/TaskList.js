import React from "react";
import { Table, Button } from "react-bootstrap";

export const TaskList = ({ tasks, markAsBadList, handleOnTaskClicked , taskToDelete}) => {
	return (
		<div>
			<h2>Task List</h2>
			<Table striped bordered hover size="sm">
				<thead>
					<tr>
						<th>Tasks</th>
						<th>hours</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{tasks.map((itm, i) => (
						<tr key={i}>
							<td>
								<input type="checkbox" 
								checked = {taskToDelete.includes(i)}
								defaultValue = {i}
								onChange ={handleOnTaskClicked}
								/>
								
								 <label>{itm.task}</label>
							</td>
							<td>{itm.hr}</td>
							<td>
								<Button onClick={() => markAsBadList(i)}>Mark AS Bad</Button>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	);
};
