const gatsby_node = require("./gatsby-node")
// @ponicode
describe("gatsby_node.onCreateWebpackConfig", () => {
    test("0", () => {
        let object = [{ type: "ADD_TODO" }, { type: "RECEIVE_MESSAGE" }, "install", "remove", "discard", "discard", "assign", "REMOVE", "SHUTDOWN", "DELETE"]
        let callFunction = () => {
            gatsby_node.onCreateWebpackConfig({ actions: object })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            gatsby_node.onCreateWebpackConfig({ actions: "SHUTDOWN" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            gatsby_node.onCreateWebpackConfig({ actions: "assign" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            gatsby_node.onCreateWebpackConfig({ actions: { type: "ADD_TODO" } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            gatsby_node.onCreateWebpackConfig({ actions: "DELETE" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            gatsby_node.onCreateWebpackConfig({ actions: undefined })
        }
    
        expect(callFunction).not.toThrow()
    })
})
