const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { APP_SECRET } = require("../config");
const { v4: uuidv4 } = require("uuid");

const GenerateSalt = async () => {
	try {
		return await bcrypt.genSalt();
	} catch (e) {
		throw new Error(`Unable to create Salt ${e}`);
	}
};

const GeneratePassword = async (password, salt) => {
	try {
		return await bcrypt.hash(password, salt);
	} catch (e) {
		throw new Error(`Unable to create Password ${e}`);
	}
};

const ValidatePassword = async (enteredPassword, savedPassword, salt) => {
	try {
		return await bcrypt.compare(enteredPassword, savedPassword);
	} catch (e) {
		throw new Error(`Unable to match password ${e}`);
	}
};

const GenerateSignature = async (payload) => {
	try {
		return await jwt.sign(payload, APP_SECRET, { expiresIn: "1d" });
	} catch (e) {
		throw new Error(`Unable to generate signature ${e}`);
	}
};

const ValidateSignature = async (signature) => {
	try {
		const token = signature.split(" ")[1];
		const payload = await jwt.verify(token, APP_SECRET);
		return payload;
	} catch (e) {
		throw new Error(`Not Authorized ${e}`);
	}
};

const FormateData = (data) => {
	if (data) {
		return { data };
	} else {
		throw new Error(`Data Not found!`);
	}
};

const UniqueId = () => {
	const id = uuidv4();
	const s = id.split("-").join("").substring(0, 16);
	return s;
};

module.exports = {
	GenerateSalt,
	GeneratePassword,
	ValidatePassword,
	GenerateSignature,
	ValidateSignature,
	FormateData,
	UniqueId,
};
