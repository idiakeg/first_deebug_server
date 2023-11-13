const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const membersArray = require("../Members");

//========= to get all the members=========
router.get("/all_members", (req, res) => {
	let msg = "Success";
	let count = membersArray.length;
	if (count === 0) {
		msg = "There are no members";
	}

	res.status(200).send({ msg, count, members: membersArray });
});

// ========to add a member========
router.post("/add", (req, res) => {
	const { name, occupation, age } = req.body;
	if (!name || !occupation || !age) {
		return res.status(400).send({
			status: "error",
			msg: "All fields must be entered",
		});
	}

	//array.push returns the length of the array after adding the new item
	const count = membersArray.push({
		id: uuidv4(),
		name,
		occupation,
		age,
		is_online: false,
	});

	res.status(200).send({
		status: "ok",
		msg: "Success",
		count,
		members: membersArray,
	});
});

// =========to update a member
router.put("/edit/:id", (req, res) => {
	const { name, occupation, age, is_online } = req.body;

	const { id } = req.params;

	// check if the client sent an id
	if (!id) {
		return res.status(400).send({ status: "error", msg: "Please enter id" });
	}

	// check if a user with the id provided exists
	let index =
		-1; /* This is included to help us track the exact index(position) in the array where the user resides in the array*/
	const found = membersArray.some((member) => {
		index++; /* increment the index upon each iteration */
		return member.id === Number(id);
	});

	// if the user with the provided id doesnot exist alert the client
	if (!found) {
		return res.status(400).send({
			staus: "error",
			msg: `No user with id: ${id} exists `,
		});
	}

	// the filter method always returns and array of items that pass the specified condition, the array returned is destructured in place in the code below
	const [member] = membersArray.filter((member) => member.id === Number(id));
	member.name = name ? name : member.name;
	member.age = age ? age : member.age;
	member.occupation = occupation ? occupation : member.occupation;
	member.is_online = is_online ? is_online : member.is_online;

	// replace the updated member at the eexact position it was before the update
	membersArray[index] =
		member; /* member here is from the destructured memeber array above */
	res.status(200).send({
		status: "ok",
		msg: "Successful update",
		members: membersArray,
	});
});

// ==========Delete a member
router.delete("/delete:id", (req, res) => {
	const { id } = req.params;

	// check if there was an id sent by the client
	if (!id) {
		return res.status(400).send({
			staus: "error",
			msg: "Please enter id",
		});
	}

	// check if the user exists
	let index = -1;
	const found = membersArray.some((member) => {
		index++;
		return member.id === id;
	});

	// check if thre user exists
	if (!found) {
		return res.status(400).send({
			staus: "error",
			msg: `No user with id: ${id} exists`,
		});
	}

	// delete user
	membersArray.splice(
		index,
		1
	); /* splice(start, deleteCount, item1, item2, ... itemN) */
	return res.status(200).send({
		status: "ok",
		msg: "successful delete",
		members: membersArray,
	});
});

// ========Get a single user===
router.get("/single_member/:id", (req, res) => {
	const { id } = req.params;

	// check if there was any id sent by the client
	if (!id) {
		return res.status(400).send({
			status: "error",
			msg: "Please enter id",
		});
	}

	const nMembers = membersArray.filter((member) => member.id === Number(id));
	if (nMembers.length === 0) {
		return res.status(404).send({
			status: "error",
			msg: `No user with id: ${id}`,
		});
	}

	return res.status(200).send({
		status: "ok",
		msg: "success",
		member: nMembers[0],
	});
});

module.exports = router;
