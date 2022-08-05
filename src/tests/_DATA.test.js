import {
    _saveQuestion,
    _saveQuestionAnswer,
    formatQuestion,
    generateUID,
} from "../utils/_DATA";



describe("_DATA.js", () => {

    it("saveQuestion: to work if valid params are passed", async () => {
        const mockObject = {
            optionOneText: "Apfel",
            optionTwoText: "Wein",
            author: "Johannes Maier",
        }

        const mockData = await _saveQuestion(mockObject);
        const { author, optionOne, optionTwo } = mockData;
        const optionOneText = optionOne.text;
        const optionTwoText = optionTwo.text;

        expect(author).toBe("Johannes Maier");
        expect(optionOneText).toBe("Apfel");
        expect(optionTwoText).toBe("Wein");
    })

    it("saveQuestion: to return an error if unvalid data is passed in", async () => {
        const mockObject = {
            optionOneText: null,
            optionTwoText: null,
            author: null,
        }

        const result = _saveQuestion(mockObject);
        await expect(result).rejects.toEqual("Please provide optionOneText, optionTwoText, and author");
    })
    test("returns the saved answer with all expected fields populated when correctly formatted data is passed to the function", async () => {
        const mockObject = {
            authedUser: "sarahedo",
            qid: "am8ehyc8byjqgar0jgpub9",
            answer: "optionOne",
        }
        const { authedUser, qid, answer } = mockObject;

        const { users, questions } = await _saveQuestionAnswer(mockObject);
        expect(users[authedUser].answers[qid] === answer).toBe(true);
        expect(questions[qid][answer].votes.includes(authedUser)).toBe(true);
    });


    it("formatQuestion: returning a formatted object if input params are valid", async () => {
        const mockData = {
            optionOneText: "A",
            optionTwoText: "B",
            author: "Johannes Maier"
        }

        const returnObject = formatQuestion(mockData);
        const { author, optionOne, optionTwo } = returnObject;
        expect(author).toBe("Johannes Maier");
        expect(optionOne.text).toBe("A");
        expect(optionTwo.text).toBe("B");
    })

    it("generateUID: returning a string which length is 22", () => {
        const result = generateUID();
        expect(result.length).toBeGreaterThan(15);
    })
})

