const as = require('assert')
const mo = require('mocha')
const sinon = require('sinon')
const While_statementVisitorClass = require('../jsParser/parser/While_statementVisitor.js').While_statementVisitor
const StatementVisitorClass = require ('../jsParser/parser/StatementVisitor.js').StatementVisitor
const ExpressionVisitorClass = require ('../jsParser/parser/ExpressionVisitor.js').ExpressionVisitor
const While_statementClass = require ('../jsParser/domain/While_statement.js').While_statement
// mo.describe('testing Algorithm_sectionVisitor.js', function () {
//   mo.describe('testing visitAlgorithm_section(ctx)', function () {
//         mo.it('testing initial = true', function () 
mo.afterEach(() => {
  sinon.restore()
})
mo.describe('testing While_statementVisitor.js', function (){
  mo.describe('testing visitWhile_statement(ctx)', function () {
  mo.it ('testing with one output', function(){
sinon.stub(StatementVisitorClass.prototype, 'visitStatement').callsFake((stmt) => stmt)
sinon.stub(ExpressionVisitorClass.prototype, 'visitExpression').callsFake((expr) => expr)
const While_statementVisitorObject= new While_statementVisitorClass () 
const input= {expression: function () { return 'testExpression' }, statement: function () { return [1,2,3,4,5]} }
const actualOutput = While_statementVisitorObject.visitWhile_statement(input)
const ReferenceOutput = new While_statementClass ('testExpression', [1,2,3,4,5])
as.equal(actualOutput.expression, ReferenceOutput.expression, 'expected value for "expression": ' + ReferenceOutput.expression + '; actual value for "expression": ' + actualOutput.expression)
as.deepEqual(actualOutput.loop_statements, ReferenceOutput.loop_statements, 'expected value for "loop_statements":' + ReferenceOutput.loop_statments + '; actual value for "loop_statements":' + actualOutput.loop_statements)
  })  
  })
} ) 
// test for While_statements.js