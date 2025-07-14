// The file each test is testing is speficied bellow each test (ex: // test for While_statementVisitor.js)
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

const { expect } = require('chai');
const sinon = require('sinon');

const { When_statementVisitor } = require('../path/to/When_statementVisitor');

describe('When_statementVisitor', () => {
  let visitor;

  beforeEach(() => {
    visitor = new When_statementVisitor();
  });

  it('should return a When_statement with correct structure from mock ctx', () => {
    const mockExpr = 'condition_expr';
    const mockStmt = 'then_stmt';

    const ctx = {
      expression: () => [{}, {}],
      statement: () => [{}, {}],
      getChildCount: () => 10,
      getChild: (i) => ({
        getText: () => (i === 0 ? 'when' : i === 5 ? 'elsewhen' : 'dummy'),
      })
    };

    const ExpressionVisitor = require('../path/to/ExpressionVisitor');
    const StatementVisitor = require('../path/to/statementVisitor');
    const When_statement = require('../path/to/domain/When_statement').When_statement;
    const When_elsewhen_statement = require('../path/to/domain/When_elsewhen_statement').When_elsewhen_statement;

    sinon.stub(ExpressionVisitor.prototype, 'visitExpression').returns(mockExpr);
    sinon.stub(StatementVisitor.prototype, 'visitStatement').returns(mockStmt);
    const whenStmtStub = sinon.stub().returns({ type: 'when_statement_object' });
    const elsewhenStub = sinon.stub().returns({ condition: mockExpr, then: [mockStmt] });

    sinon.replace(require('../path/to/domain/When_statement'), 'When_statement', whenStmtStub);
    sinon.replace(require('../path/to/domain/When_elsewhen_statement'), 'When_elsewhen_statement', elsewhenStub);
    const result = visitor.visitWhen_statement(ctx);

    expect(whenStmtStub.calledOnce).to.be.true;
    expect(elsewhenStub.called).to.be.true;
    expect(result).to.deep.equal({ type: 'when_statement_object' });

    sinon.restore();
  });
});
// test for When_statementVisitor.js

const { expect } = require('chai');
const sinon = require('sinon');

const { When_equationVisitor } = require('../path/to/When_equationVisitor');

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

    const ExpressionVisitor = require('../path/to/ExpressionVisitor');
    const EquationVisitor = require('../path/to/EquationVisitor');
    const When_equation = require('../path/to/domain/When_equation').When_equation;
    const When_elsewhen_equation = require('../path/to/domain/When_elsewhen_equation').When_elsewhen_equation;

    sinon.stub(ExpressionVisitor.prototype, 'visitExpression').returns(mockExpr);
    sinon.stub(EquationVisitor.prototype, 'visitEquation').returns(mockEqn);
    const whenEqStub = sinon.stub().returns({ type: 'when_equation_object' });
    const elsewhenStub = sinon.stub().returns({ condition: mockExpr, then: [mockEqn] });

    sinon.replace(require('../path/to/domain/When_equation'), 'When_equation', whenEqStub);
    sinon.replace(require('../path/to/domain/When_elsewhen_equation'), 'When_elsewhen_equation', elsewhenStub);

    const result = visitor.visitWhen_equation(ctx);

    expect(whenEqStub.calledOnce).to.be.true;
    expect(elsewhenStub.called).to.be.true;
    expect(result).to.deep.equal({ type: 'when_equation_object' });

    sinon.restore();
  });
});
// test for When_equationVisitor.js

const assert = require('assert');
const sinon = require('sinon');

const { Type_specifierVisitor } = require('../path/to/Type_specifierVisitor');
const Type_specifier = require('../path/to/domain/Type_specifier');
const NameVisitor = require('../path/to/NameVisitor');

describe('Type_specifierVisitor', () => {
  it('should return Type_specifier with name when name is present', () => {
    const ctx = { name: () => 'nameNode' };
    const fakeName = 'FakeName';

    sinon.stub(NameVisitor, 'NameVisitor').returns({
      visitName: sinon.stub().withArgs('nameNode').returns(fakeName)
    });

    sinon.stub(Type_specifier, 'Type_specifier').callsFake(name => ({ name }));

    const visitor = new Type_specifierVisitor();
    const result = visitor.visitType_specifier(ctx);

    assert.strictEqual(result.name, fakeName);

    NameVisitor.NameVisitor.restore();
    Type_specifier.Type_specifier.restore();
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
// test for Type_specifierVisitor.js

const assert = require('assert');
const { Type_prefixVisitor } = require('../path/to/Type_prefixVisitor');

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
// test for Type_prefixVisitor.js

const assert = require('assert');
const sinon = require('sinon');

const { TermVisitor } = require('../path/to/TermVisitor');
const Term = require('../path/to/domain/Term');
const FactorVisitor = require('../path/to/FactorVisitor');

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
// test for TermVisitor.js

const assert = require('assert');
const { SubscriptVisitor } = require('../SubscriptVisitor');

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
// test/SubscriptVisitor.test.js

const assert = require('assert');
const { String_commentVisitor } = require('../String_commentVisitor');

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
// test/String_commentVisitor.test.js

const assert = require('assert');
const { Stored_definitionVisitor } = require('../Stored_definitionVisitor');

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
// test/Stored_definitionVisitor.test.js

const assert = require('assert');
const { StatementVisitor } = require('../your-path/StatementVisitor');

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
// test/StatementVisitor.test.js

const assert = require('assert');
const { Simple_expressionVisitor } = require('../your-path/Simple_expressionVisitor');

describe('Simple_expressionVisitor', function () {
  it('should return Simple_expression with one logical expression', function () {
    const visitor = new Simple_expressionVisitor();

    const mockCtx = {
      logical_expression: () => [
        { text: 'expr1' },
      ]
    };

  
    const original = require.cache[require.resolve('../your-path/Logical_expressionVisitor')];
    require.cache[require.resolve('../your-path/Logical_expressionVisitor')] = {
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

    
    require.cache[require.resolve('../your-path/Logical_expressionVisitor')] = original;
  });
});
// test/Simple_expressionVisitor.test.js

const assert = require('assert');
const { Simple_expressionVisitor } = require('../your-path/Simple_expressionVisitor');

describe('Simple_expressionVisitor', function () {
  it('should return Simple_expression with one logical expression', function () {
    const visitor = new Simple_expressionVisitor();

    const mockCtx = {
      logical_expression: () => [
        { text: 'expr1' },
      ]
    };

    const original = require.cache[require.resolve('../your-path/Logical_expressionVisitor')];
    require.cache[require.resolve('../your-path/Logical_expressionVisitor')] = {
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

    require.cache[require.resolve('../your-path/Logical_expressionVisitor')] = original;
  });
});
// test/Simple_expressionVisitor.test.js

const assert = require('assert');
const { Short_class_specifierVisitor } = require('../your-path/Short_class_specifierVisitor');

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
// test/Short_class_specifierVisitor.test.js

import assert from 'assert';
import Short_class_definitionVisitor from '../Short_class_definitionVisitor.js';

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

import assert from 'assert';
import RelationVisitor from '../RelationVisitor.js';

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
// test/RelationVisitor.test.js

import assert from 'assert';
import Rel_opVisitor from '../Rel_opVisitor.js';

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
// test/Rel_opVisitor.test.jsf

import assert from 'assert';
import Rel_opVisitor from '../Rel_opVisitor.js';

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
// test/Rel_opVisitor.test.js