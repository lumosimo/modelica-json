// The file each test is testing is speficied below each test (ex: // test for While_statementVisitor.js)
const as = require('assert')
const mo = require('mocha')
const sinon = require('sinon')
const While_statementVisitorClass = require('../jsParser/parser/While_statementVisitor.js').While_statementVisitor
const StatementVisitorClass = require ('../jsParser/parser/StatementVisitor.js').StatementVisitor
const ExpressionVisitorClass = require ('../jsParser/parser/ExpressionVisitor.js').ExpressionVisitor
const While_statementClass = require ('../jsParser/parser/While_statementVisitor.js').While_statement
const { When_equationVisitor } = require('../jsParser/parser/When_equationVisitor.js');// mo.describe('testing Algorithm_sectionVisitor.js', function () {
const { Type_specifierVisitor } = require('../jsParser/parser/Type_specifierVisitor.js');
const Type_specifier = require('../jsParser/parser/Type_specifierVisitor.js');
const NameVisitor = require('../jsParser/parser/NameVisitor.js');
const { When_statementVisitor } = require('../jsParser/parser/When_statementVisitor.js');
const { StatementVisitor } = require('../jsParser/parser/StatementVisitor.js'); 
const { When_statement } = require('../jsParser/parser/When_statementVisitor.js');
const EquationVisitor = require('../jsParser/parser/EquationVisitor.js');
const When_equation = require('../jsParser/parser/When_equationVisitor.js').When_equation;
const TermVisitor = require('../jsParser/parser/TermVisitor.js');
const Type_prefixVisitor  = require('../jsParser/parser/Type_prefixVisitor.js');;
const FactorVisitor = require('../jsParser/parser/FactorVisitor.js');
const SubscriptVisitor  = require('../jsParser/parser/SubscriptVisitor.js');
const String_commentVisitor = require('../jsParser/parser/String_commentVisitor.js');
const Stored_definitionVisitor  = require('../jsParser/parser/Stored_definitionVisitor.js');
const Simple_expressionVisitor = require('../jsParser/parser/Simple_expressionVisitor.js');
const Short_class_specifierVisitor = require('../jsParser/parser/Short_class_specifierVisitor.js');
const PrimaryVisitor = require('../jsParser/parser/PrimaryVisitor.js');
const Output_expression_listVisitor = require('../jsParser/parser/Output_expression_listVisitor.js');
const Rel_opVisitor = require('../jsParser/parser/Rel_opVisitor.js');
const Named_argumentVisitor = require('../jsParser/parser/Named_argumentVisitor.js');
const Named_argumentsVisitor = require('../jsParser/parser/Named_argumentsVisitor.js');
const ModificationVisitor = require('../jsParser/parser/ModificationVisitor.js');
const Long_class_specifierVisitor = require('../jsParser/parser/Long_class_specifierVisitor.js');
const Logical_termVisitor = require('../jsParser/parser/Logical_termVisitor.js');
const Logical_factorVisitor = require('../jsParser/parser/Logical_factorVisitor.js');
const { Logical_expressionVisitor } = require('../jsParser/parser/Logical_expressionVisitor.js');
const { Import_listVisitor } = require('../jsParser/parser/Import_listVisitor.js');
const Import_list = require('../jsParser/parser/Import_listVisitor.js');
// mo.describe('testing Algorithm_sectionVisitor.js', function () {
// mo.describe('testing visitAlgorithm_section(ctx)', function () {
// mo.it('testing initial = true', function () {

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

describe('When_statementVisitor', () => {
  let visitor;

  beforeEach(() => {
    visitor = new When_statementVisitor();
    visitor.expressionVisitor = new ExpressionVisitor();

    visitor.statementVisitor = new StatementVisitor();
  });

  it('should return a When_statement with correct structure using real dependencies', () => {
    const ctx = {
      expression: () => [{}, {}],
      statement: () => [{}, {}],
      getChildCount: () => 10,
      getChild: (i) => ({
        getText: () => {
          if (i === 0) return 'when';
          if (i === 5) return 'elsewhen';
          return 'other';
        }
      })
    };

    const exprSpy = sinon.spy(visitor.expressionVisitor, 'visitExpression');
    const stmtSpy = sinon.spy(visitor.statementVisitor, 'visitStatement');

    visitor.expressionVisitor.visitExpression = (ctx) => ctx.getText();
    visitor.statementVisitor.visitStatement = (ctx) => ctx.getText();

    const result = visitor.visitWhen_statement(ctx);

    assert.ok(result instanceof When_statement);
    assert.strictEqual(result.condition, 'a > 0');
    assert.deepStrictEqual(result.then, ['doA();']);

    assert.strictEqual(result.elsewhens.length, 1);
    assert.ok(result.elsewhens[0] instanceof When_elsewhen_statement);
    assert.strictEqual(result.elsewhens[0].condition, 'b < 5');
    assert.deepStrictEqual(result.elsewhens[0].then, ['doB();']);

    assert.strictEqual(exprSpy.callCount, 2);
    assert.strictEqual(stmtSpy.callCount, 2);

    exprSpy.restore();
    stmtSpy.restore();
  });
});
// test for When_statementVisitor.js (const moved to top)

describe('When_equationVisitor', () => {
  let visitor;

  beforeEach(() => {
    visitor = new When_equationVisitor();
  });

  it('should return a When_equation with correct structure from mock ctx', () => {
    const mockExpr = 'condition_expr';
    const mockEqn = 'then_eqn';

    const ctx = {
      expression: () => [{}, {}],
      equation: () => [{}, {}], 
      getChildCount: () => 10,
      getChild: (i) => ({
        getText: () => (i === 0 ? 'when' : i === 5 ? 'elsewhen' : 'dummy'),
      }),
    };

    sinon.stub(ExpressionVisitor.prototype, 'visitExpression').returns(mockExpr);
    sinon.stub(EquationVisitor.prototype, 'visitEquation').returns(mockEqn);
    const whenEqStub = sinon.stub().returns({ type: 'when_equation_object' });
    const elsewhenStub = sinon.stub().returns({ condition: mockExpr, then: [mockEqn] });

    sinon.replace(require('../jsParser/parser/When_equation'), 'When_equation', whenEqStub);
    sinon.replace(require('../jsParser/parser/When_elsewhen_equation'), 'When_elsewhen_equation', elsewhenStub);

    const result = visitor.visitWhen_equation(ctx);

    expect(whenEqStub.calledOnce).to.be.true;
    expect(elsewhenStub.called).to.be.true;
    expect(result).to.deep.equal({ type: 'when_equation_object' });

    sinon.restore();
  });
});
// test for When_equationVisitor.js (const moved to top) 

describe('Type_specifierVisitor', () => {
  it('should return Type_specifier with name when name is present', () => {
    const ctx = { name: () => 'nameNode' };
    const fakeName = 'FakeName';

    sinon.stub(NameVisitor, 'NameVisitor').returns({
      visitName: sinon.stub().withArgs('nameNode').returns(fakeName)
    });

    const visitor = new Type_specifierVisitor();
    const result = visitor.visitType_specifier(ctx);

    assert.strictEqual(result.name, fakeName);

  });

  it('should return Type_specifier with null when name is missing', () => {
    const ctx = { name: () => null };

    sinon.stub(Type_specifier, 'Type_specifier').callsFake(name => ({ name }));

    const visitor = new Type_specifierVisitor();
    const result = visitor.visitType_specifier(ctx);

    assert.strictEqual(result.name, null);

    Type_specifier.Type_specifier.restore();
  });
});
// test for Type_specifierVisitor.js (const moved to top)

describe('Type_prefixVisitor', () => {
  function mockCtx(flags = {}) {
    return {
      FLOW: () => flags.FLOW ? { getText: () => 'flow' } : null,
      STREAM: () => flags.STREAM ? { getText: () => 'stream' } : null,
      DISCRETE: () => flags.DISCRETE ? { getText: () => 'discrete' } : null,
      PARAMETER: () => flags.PARAMETER ? { getText: () => 'parameter' } : null,
      CONSTANT: () => flags.CONSTANT ? { getText: () => 'constant' } : null,
      INPUT: () => flags.INPUT ? { getText: () => 'input' } : null,
      OUTPUT: () => flags.OUTPUT ? { getText: () => 'output' } : null
    };
  }

  it('returns flow discrete input when all are present', () => {
    const ctx = mockCtx({ FLOW: true, DISCRETE: true, INPUT: true });
    const visitor = new Type_prefixVisitor();
    const result = visitor.visitType_prefix(ctx);
    assert.strictEqual(result, 'flow discrete input');
  });

  it('returns parameter when only parameter is present', () => {
    const ctx = mockCtx({ PARAMETER: true });
    const visitor = new Type_prefixVisitor();
    const result = visitor.visitType_prefix(ctx);
    assert.strictEqual(result, 'parameter');
  });

  it('returns stream output', () => {
    const ctx = mockCtx({ STREAM: true, OUTPUT: true });
    const visitor = new Type_prefixVisitor();
    const result = visitor.visitType_prefix(ctx);
    assert.strictEqual(result, 'stream output');
  });

  it('returns empty string when nothing is present', () => {
    const ctx = mockCtx({});
    const visitor = new Type_prefixVisitor();
    const result = visitor.visitType_prefix(ctx);
    assert.strictEqual(result, '');
  });
});
// test for Type_prefixVisitor.js (no need to move const to top)

describe('TermVisitor', () => {
  it('should extract mul_ops and factors correctly', () => {
    const ctx = {
      mul_op: () => [{ getText: () => '*' }, { getText: () => '/' }],
      factor: () => ['x', 'y']
    };

    const fakeFactorResults = ['Xresult', 'Yresult'];
    const visitFactorStub = sinon.stub().onCall(0).returns(fakeFactorResults[0]).onCall(1).returns(fakeFactorResults[1]);
    sinon.stub(FactorVisitor, 'FactorVisitor').returns({ visitFactor: visitFactorStub });

    const termStub = sinon.stub(Term, 'Term').callsFake((factors, ops) => ({ factors, mul_ops: ops }));

    const visitor = new TermVisitor();
    const result = visitor.visitTerm(ctx);

    assert.deepStrictEqual(result.factors, fakeFactorResults);
    assert.deepStrictEqual(result.mul_ops, ['*', '/']);

    FactorVisitor.FactorVisitor.restore();
    Term.Term.restore();
  });

  it('should return empty arrays if no factors or operators exist', () => {
    const ctx = {
      mul_op: () => null,
      factor: () => null
    };

    const termStub = sinon.stub(Term, 'Term').callsFake((factors, ops) => ({ factors, mul_ops: ops }));

    const visitor = new TermVisitor();
    const result = visitor.visitTerm(ctx);

    assert.deepStrictEqual(result.factors, []);
    assert.deepStrictEqual(result.mul_ops, []);

    Term.Term.restore();
  });
});
// test for TermVisitor.js (const moved to top)

describe('SubscriptVisitor', function () {
  it('should return default Subscript with null expression and false color_op', function () {
    const visitor = new SubscriptVisitor();
    const ctx = { SYMBOL_COLON: () => null, expression: () => null };
    const result = visitor.visitSubscript(ctx);
    assert.strictEqual(result.color_op, false);
    assert.strictEqual(result.expression, null);
  });

  it('should return Subscript with true color_op if SYMBOL_COLON exists', function () {
    const visitor = new SubscriptVisitor();
    const ctx = {
      SYMBOL_COLON: () => ({}),
      expression: () => null
    };
    const result = visitor.visitSubscript(ctx);
    assert.strictEqual(result.color_op, true);
    assert.strictEqual(result.expression, null);
  });

  it('should call ExpressionVisitor if expression exists (mocked)', function () {
    const visitor = new SubscriptVisitor();
    const expression = { evaluate: () => 42 };
    const ctx = {
      SYMBOL_COLON: () => null,
      expression: () => expression
    };

    const result = visitor.visitSubscript(ctx);
    assert.ok('color_op' in result);
    assert.ok('expression' in result);
  });
});
// test/SubscriptVisitor.test.js (const moved to top)

describe('String_commentVisitor', function () {
  it('should return empty string if ctx.STRING is missing', function () {
    const visitor = new String_commentVisitor();
    const ctx = { STRING: () => null };
    const result = visitor.visitString_comment(ctx);
    assert.strictEqual(result, '');
  });

  it('should return single string when one STRING present', function () {
    const visitor = new String_commentVisitor();
    const ctx = {
      STRING: () => [
        { getText: () => '"hello"' }
      ]
    };
    const result = visitor.visitString_comment(ctx);
    assert.strictEqual(result, '"hello"');
  });

  it('should join multiple strings with +', function () {
    const visitor = new String_commentVisitor();
    const ctx = {
      STRING: () => [
        { getText: () => '"a"' },
        { getText: () => '"b"' }
      ]
    };
    const result = visitor.visitString_comment(ctx);
    assert.strictEqual(result, '"a"+"b"');
  });
});
// test/String_commentVisitor.test.js (const moved to top)

describe('Stored_definitionVisitor', function () {
  it('should instantiate correctly', function () {
    const visitor = new Stored_definitionVisitor();
    assert.ok(visitor instanceof Stored_definitionVisitor);
  });

  it('should handle empty context gracefully', function () {
    const visitor = new Stored_definitionVisitor();
    const ctx = { name: () => null, class_definition: () => [] };
    const result = visitor.visitStored_definition(ctx);
    assert.deepStrictEqual(result, {
      within: '',
      final_class_definitions: []
    });
  });
});
// test/Stored_definitionVisitor.test.js (const moved to top)

describe('StatementVisitor', function () {
  it('should handle assignment statements', function () {
    const visitor = new StatementVisitor();

    const mockCtx = {
      component_reference: () => ({}),
      expression: () => ({}),
      function_call_args: () => null,
      output_expression_list: () => null,
      if_statement: () => null,
      for_statement: () => null,
      while_statement: () => null,
      when_statement: () => null,
      comment: () => null,
      BREAK: () => false,
      RETURN: () => false,
    };

    const result = visitor.visitStatement(mockCtx);

    assert.ok(result.assignment_statement);
    assert.strictEqual(result.function_call_statement, null);
  });
});
// test/StatementVisitor.test.js (const moved to top)

describe('Simple_expressionVisitor', function () {
  it('should return Simple_expression with one logical expression', function () {
    const visitor = new Simple_expressionVisitor();

    const mockCtx = {
      logical_expression: () => [
        { text: 'expr1' },
      ]
    };

  
    const original = require.cache[require.resolve('../jsParser/Logical_expressionVisitor')];
    require.cache[require.resolve('../jsParser/Logical_expressionVisitor')] = {
      exports: {
        Logical_expressionVisitor: class {
          visitLogical_expression(expr) {
            return expr.text;
          }
        }
      }
    };

    const result = visitor.visitSimple_expression(mockCtx);
    assert.strictEqual(result.logical_expression1, 'expr1');
    assert.strictEqual(result.logical_expression2, null);
    assert.strictEqual(result.logical_expression3, null);

    
    require.cache[require.resolve('../jsParser/Logical_expressionVisitor')] = original;
  });
});
// test/Simple_expressionVisitor.test.js (const moved to top)

describe('Simple_expressionVisitor', function () {
  it('should return Simple_expression with one logical expression', function () {
    const visitor = new Simple_expressionVisitor();

    const mockCtx = {
      logical_expression: () => [
        { text: 'expr1' },
      ]
    };

    const original = require.cache[require.resolve('../jsParser/Logical_expressionVisitor')];
    require.cache[require.resolve('../jsParser/Logical_expressionVisitor')] = {
      exports: {
        Logical_expressionVisitor: class {
          visitLogical_expression(expr) {
            return expr.text;
          }
        }
      }
    };

    const result = visitor.visitSimple_expression(mockCtx);
    assert.strictEqual(result.logical_expression1, 'expr1');
    assert.strictEqual(result.logical_expression2, null);
    assert.strictEqual(result.logical_expression3, null);

    require.cache[require.resolve('../jsParser/Logical_expressionVisitor')] = original;
  });
});
// test/Simple_expressionVisitor.test.js (const moved to top)

describe('Short_class_specifierVisitor', function () {
  it('should correctly visit and return Short_class_specifier object', function () {
    const visitor = new Short_class_specifierVisitor();

    const mockCtx = {
      IDENT: () => ({ getText: () => 'MyIdentifier' }),
      base_prefix: () => ({}),
      name: () => ({}),
      array_subscripts: () => ({}),
      class_modification: () => ({}),
      comment: () => ({}),
      enum_list: () => ({}),
    };

    const result = visitor.visitShort_class_specifier(mockCtx);

    assert.strictEqual(result.identifier, 'MyIdentifier');
    assert.ok(result.value); 
  });
});
// test/Short_class_specifierVisitor.test.js (const moved to top)

describe('Short_class_definitionVisitor', function () {
    it('should call visitChildren when visitShort_class_definition is invoked', function () {
        const visitor = new Short_class_definitionVisitor();
        let called = false;
        const mockCtx = { text: 'mock' };

        visitor.visitChildren = function(ctx) {
            called = true;
            assert.strictEqual(ctx, mockCtx);
            return 'visitedShortClass';
        };

        const result = visitor.visitShort_class_definition(mockCtx);
        assert.strictEqual(result, 'visitedShortClass');
        assert.strictEqual(called, true);
    });
});
// test/Short_class_definitionVisitor.test.js

describe('RelationVisitor', function () {
    it('should call visitChildren when visitRelation is invoked', function () {
        const visitor = new RelationVisitor();
        let called = false;
        const mockCtx = { text: 'mock' };

        visitor.visitChildren = function(ctx) {
            called = true;
            assert.strictEqual(ctx, mockCtx);
            return 'visitedRelation';
        };

        const result = visitor.visitRelation(mockCtx);
        assert.strictEqual(result, 'visitedRelation');
        assert.strictEqual(called, true);
    });
});
// test/RelationVisitor.test.js (no need to move const to top)

describe('PrimaryVisitor', () => {
  it('should return text from literal', () => {
    const ctx = {
      literal: () => ({ getText: () => '42' }),
      name: () => null
    };

    const visitor = new PrimaryVisitor();
    const result = visitor.visitPrimary(ctx);
    assert.strictEqual(result, '42');
  });

  it('should return text from name if literal is absent', () => {
    const ctx = {
      literal: () => null,
      name: () => ({ getText: () => 'x' })
    };

    const visitor = new PrimaryVisitor();
    const result = visitor.visitPrimary(ctx);
    assert.strictEqual(result, 'x');
  });

  it('should return null if neither literal nor name is present', () => {
    const ctx = {
      literal: () => null,
      name: () => null
    };

    const visitor = new PrimaryVisitor();
    const result = visitor.visitPrimary(ctx);
    assert.strictEqual(result, null);
  });
});
// test/PrimaryVisitor.test.js (const moved to top)
 
describe('Output_expression_listVisitor', () => {
  it('should return array of expression texts', () => {
    const ctx = {
      output_expression: () => [
        { getText: () => 'a' },
        { getText: () => 'b' }
      ]
    };

    const visitor = new OutputExpressionListVisitor();
    const result = visitor.visitOutput_expression_list(ctx);
    assert.deepStrictEqual(result, ['a', 'b']);
  });

  it('should return empty array if no expressions', () => {
    const ctx = {
      output_expression: () => []
    };

    const visitor = new OutputExpressionListVisitor();
    const result = visitor.visitOutput_expression_list(ctx);
    assert.deepStrictEqual(result, []);
  });

  it('should return empty array if output_expression is undefined', () => {
    const ctx = {
      output_expression: () => undefined
    };

    const visitor = new OutputExpressionListVisitor();
    const result = visitor.visitOutput_expression_list(ctx);
    assert.deepStrictEqual(result, []);
  });
});
// test/Output_expression_listVisitor.test.js (const moved to top)

describe('NameVisitor', () => {
  it('should return text from Identifier', () => {
    const ctx = { 
      Identifier: () => ({
        getText: () => 'myVar'
      })
    };

    const visitor = new NameVisitor();
    const result = visitor.visitName(ctx);
    assert.strictEqual(result, 'myVar');
  });

  it('should return null if Identifier is not present', () => {
    const ctx = {
      Identifier: () => null
    };

    const visitor = new NameVisitor();
    const result = visitor.visitName(ctx);
    assert.strictEqual(result, null);
  });
});
// test/NameVisitor.test.js (const moved to top)

describe('Rel_opVisitor', function () {
    it('should call visitChildren when visitRel_op is invoked', function () {
        const visitor = new Rel_opVisitor();
        let called = false;
        const mockCtx = { text: 'mock' };

        visitor.visitChildren = function(ctx) {
            called = true;
            assert.strictEqual(ctx, mockCtx);
            return 'visitedRelOp';
        };

        const result = visitor.visitRel_op(mockCtx);
        assert.strictEqual(result, 'visitedRelOp');
        assert.strictEqual(called, true);
    });
});
// test/Rel_opVisitor.test.js (no need to move const to top)

describe('PrimaryVisitor', function () {
    it('should call visitChildren when visitPrimary is invoked', function () {
        const visitor = new PrimaryVisitor();
        let called = false;
        const mockCtx = { text: 'primaryExpr' };

        visitor.visitChildren = function(ctx) {
            called = true;
            assert.strictEqual(ctx, mockCtx);
            return 'visitedPrimary';
        };

        const result = visitor.visitPrimary(mockCtx);
        assert.strictEqual(result, 'visitedPrimary');
        assert.strictEqual(called, true);
    });
});
// test/PrimaryVisitor.test.js (no need to move const to top)

describe('Output_expression_listVisitor', function () {
    it('should call visitChildren when visitOutput_expression_list is invoked', function () {
        const visitor = new Output_expression_listVisitor();
        let called = false;
        const mockCtx = { text: 'outputList' };

        visitor.visitChildren = function(ctx) {
            called = true;
            assert.strictEqual(ctx, mockCtx);
            return 'visitedOutputList';
        };

        const result = visitor.visitOutput_expression_list(mockCtx);
        assert.strictEqual(result, 'visitedOutputList');
        assert.strictEqual(called, true);
    });
});
// test/Output_expression_listVisitor.test.js (no need to move const to top)

describe('NameVisitor', function () {
    it('should call visitChildren when visitName is invoked', function () {
        const visitor = new NameVisitor();
        let called = false;
        const mockCtx = { text: 'mockName' };

        visitor.visitChildren = function(ctx) {
            called = true;
            assert.strictEqual(ctx, mockCtx);
            return 'visitedName';
        };

        const result = visitor.visitName(mockCtx);
        assert.strictEqual(result, 'visitedName');
        assert.strictEqual(called, true);
    });
});
// test/NameVisitor.test.js (no need to move const to top)

describe('Named_argumentVisitor', () => {
  it('should return object with name and value', () => {
    const ctx = {
      name: () => ({ getText: () => 'argName' }),
      expression: () => ({ getText: () => '42' })
    };

    const visitor = new Named_argumentVisitor();
    const result = visitor.visitNamed_argument(ctx);
    assert.deepStrictEqual(result, { name: 'argName', value: '42' });
  });

  it('should handle missing name or expression', () => {
    const ctx = {
      name: () => null,
      expression: () => null
    };

    const visitor = new Named_argumentVisitor();
    const result = visitor.visitNamed_argument(ctx);
    assert.deepStrictEqual(result, { name: null, value: null });
  });
});
// test/Named_argumentVisitor.test.js (const moved to top)

describe('Named_argumentsVisitor', () => {
  it('should return array of named arguments', () => {
    const ctx = {
      named_argument: () => [
        { getText: () => 'arg1' },
        { getText: () => 'arg2' }
      ]
    };

    const visitor = new Named_argumentsVisitor();
    const result = visitor.visitNamed_arguments(ctx);
    assert.deepStrictEqual(result, ['arg1', 'arg2']);
  });

  it('should return empty array if no named_argument present', () => {
    const ctx = {
      named_argument: () => []
    };

    const visitor = new Named_argumentsVisitor();
    const result = visitor.visitNamed_arguments(ctx);
    assert.deepStrictEqual(result, []);
  });
});
// test/Named_argumentsVisitor.test.js (const moved to top)

describe('ModificationVisitor', () => {
  it('should return text from class_modification', () => {
    const ctx = {
      class_modification: () => ({
        getText: () => 'modValue'
      })
    };

    const visitor = new ModificationVisitor();
    const result = visitor.visitModification(ctx);
    assert.strictEqual(result, 'modValue');
  });

  it('should return null if class_modification is not present', () => {
    const ctx = {
      class_modification: () => null
    };

    const visitor = new ModificationVisitor();
    const result = visitor.visitModification(ctx);
    assert.strictEqual(result, null);
  });
});
// test/ModificationVisitor.test.js (const moved to top)

describe('Long_class_specifierVisitor', function () {
  it('should correctly extract a class name from context', function () {
    const visitor = new Long_class_specifierVisitor();

    const mockCtx = {
      Identifier: () => ({ getText: () => 'MyClass' })
    };

    const result = visitor.visit(mockCtx);
    assert.strictEqual(result, 'MyClass');
  });

});
// test/Long_class_specifierVisitor.test.js (const moved to top)

describe('Logical_termVisitor', function () {
  it('should return correct AND logic result', function () {
    const visitor = new Logical_termVisitor();

    const mockCtx = {
      children: [
        { accept: () => true },
        { getText: () => '&&' },
        { accept: () => false }
      ]
    };

    const result = visitor.visit(mockCtx);
    assert.strictEqual(result, false);
  });
});
// test/Logical_termVisitor.test.js (const moved to top)

describe('Logical_factorVisitor', function () {
  it('should return true for input context with value "true"', function () {
    const visitor = new Logical_factorVisitor();
    const mockCtx = { getText: () => 'true' };

    const result = visitor.visit(mockCtx);
    assert.strictEqual(result, true);
  });

  it('should return false for input context with value "false"', function () {
    const visitor = new Logical_factorVisitor();
    const mockCtx = { getText: () => 'false' };

    const result = visitor.visit(mockCtx);
    assert.strictEqual(result, false);
  });
});
// test/Logical_factorVisitor.test.js (const moved to top)

describe('Logical_expressionVisitor', () => {
  it('should return Logical_expression with logical terms', () => {
    const ctx = {
      logical_term: () => ['x', 'y']
    };

    const fakeResults = ['LT1', 'LT2'];
    const visitStub = sinon.stub().onCall(0).returns(fakeResults[0]).onCall(1).returns(fakeResults[1]);

    sinon.stub(Logical_termVisitor, 'Logical_termVisitor')
      .returns({ visitLogical_term: visitStub });

    const stub = sinon.stub(Logical_expression, 'Logical_expression')
      .callsFake(list => ({ logical_terms: list }));

    const visitor = new Logical_expressionVisitor();
    const result = visitor.visitLogical_expression(ctx);

    assert.deepStrictEqual(result.logical_terms, fakeResults);

    Logical_termVisitor.Logical_termVisitor.restore();
    Logical_expression.Logical_expression.restore();
  });

  it('should return empty Logical_expression if no logical_term exists', () => {
    const ctx = {
      logical_term: () => null
    };

    const stub = sinon.stub(Logical_expression, 'Logical_expression')
      .callsFake(list => ({ logical_terms: list }));

    const visitor = new Logical_expressionVisitor();
    const result = visitor.visitLogical_expression(ctx);

    assert.deepStrictEqual(result.logical_terms, []);

    stub.restore();
  });
});
// test/Logical_expressionVisitor.test.js (const moved to top) 

describe('Import_listVisitor', () => {
  it('should return an Import_list with identifiers', () => {
    const ctx = {
      IDENT: () => ['A', 'B', 'C']
    };

    const stub = sinon.stub(Import_list, 'Import_list')
      .callsFake(list => ({ identifiers: list }));

    const visitor = new Import_listVisitor();
    const result = visitor.visitImport_list(ctx);

    assert.deepStrictEqual(result.identifiers, ['A', 'B', 'C']);

    stub.restore();
  });

  it('should return an empty Import_list if IDENT() is null', () => {
    const ctx = {
      IDENT: () => null
    };

    const stub = sinon.stub(Import_list, 'Import_list')
      .callsFake(list => ({ identifiers: list }));

    const visitor = new Import_listVisitor();
    const result = visitor.visitImport_list(ctx);

    assert.deepStrictEqual(result.identifiers, []);

    stub.restore();
  });
});
// test/Import_listVisitor.test.js (const moved to top)