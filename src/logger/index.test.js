const chai = require('chai');
const sinon = require('sinon');
const config = require('../config');
const logger = require('../logger');

const expect = chai.expect;

const { stdout, stderr } = require('test-console');

const testRandom = max =>
  Math.floor(Math.random() * max);

describe('logger', () => {
  let consoleOut;
  let consoleErr;
  let sandbox;
  const errLevel = {
    debug: 'DEBUG',
    warn: 'WARN',
    error: 'ERROR',
    info: 'INFO'
  };
  beforeEach(() => {
    sandbox = sinon.createSandbox();
    sandbox.stub(config, 'errLevel').value(errLevel);
  });
  afterEach(() => {
    sandbox.restore();
  });

  describe('.error', () => {
    beforeEach(() => {
      sandbox.stub(config, 'logLevel').value(errLevel.error);
    });
    describe('when message not provided', () => {
      let error;
      beforeEach(() => {
        error = new Error(`error${testRandom(1000000)}`);
        consoleErr = stderr.inspectSync(() => {
          logger.error(error);
        });
      });
      it('should output the error level to stderr', () => {
        expect(consoleErr[0]).to.include('[ERROR]');
      });
      it('should output the error to stderr', () => {
        expect(consoleErr[0]).to.include(error.message);
      });
      it('should output the stack to stderr', () => {
        expect(consoleErr[0]).to.include(error.stack);
      });
    });
    describe('when message is provided', () => {
      let error;
      const message = `message${testRandom(1000000)}`;
      beforeEach(() => {
        error = new Error(`error${testRandom(1000000)}`);
        consoleErr = stderr.inspectSync(() => {
          logger.error(error, message);
        });
      });
      it('should output the log message to stderr', () => {
        expect(consoleErr[0]).to.include(message);
      });
    });
  });
  describe('.warn', () => {
    const error = new Error(`error${testRandom(1000000)}`);
    const message = `message${testRandom(1000000)}`;
    describe('when error level is error', () => {
      beforeEach(() => {
        sandbox.stub(config, 'logLevel').value(errLevel.error);
        consoleErr = stderr.inspectSync(() => {
          logger.warn(message, error);
        });
      });
      it('should not call error()', () => {
        expect(consoleErr.length).to.equal(0);
      });
    });
    describe('when error level is warn', () => {
      beforeEach(() => {
        sandbox.stub(config, 'logLevel').value(errLevel.warn);
        consoleErr = stderr.inspectSync(() => {
          logger.warn(message, error);
        });
      });
      it('it should log error level', () => {
        expect(consoleErr[0]).to.include('[WARN]');
      });
      it('it should log message', () => {
        expect(consoleErr[0]).to.include(message);
      });
      it('it should log error message', () => {
        expect(consoleErr[0]).to.include(error.message);
      });
    });
    describe('when error level is info', () => {
      beforeEach(() => {
        sandbox.stub(config, 'logLevel').value(errLevel.info);
        consoleErr = stderr.inspectSync(() => {
          logger.warn(message, error);
        });
      });
      it('it should log output', () => {
        expect(consoleErr.length).to.equal(1);
      });
    });
    describe('when error level is debug', () => {
      beforeEach(() => {
        sandbox.stub(config, 'logLevel').value(errLevel.debug);
        consoleErr = stderr.inspectSync(() => {
          logger.warn(message, error);
        });
      });
      it('it should log output', () => {
        expect(consoleErr.length).to.equal(1);
      });
    });
  });
  describe('.info', () => {
    const error = new Error(`error${testRandom(1000000)}`);
    const message = `message${testRandom(1000000)}`;
    describe('when error level is error', () => {
      beforeEach(() => {
        sandbox.stub(config, 'logLevel').value(errLevel.error);
        consoleOut = stdout.inspectSync(() => {
          consoleErr = stderr.inspectSync(() => {
            logger.info(message, error);
          });
        });
      });
      it('should not output to stderr', () => {
        expect(consoleErr.length).to.equal(0);
      });
      it('should not output to stdout', () => {
        expect(consoleOut.length).to.equal(0);
      });
    });
    describe('when error level is warn', () => {
      beforeEach(() => {
        sandbox.stub(config, 'logLevel').value(errLevel.warn);
        consoleOut = stdout.inspectSync(() => {
          consoleErr = stderr.inspectSync(() => {
            logger.info(message, error);
          });
        });
      });
      it('should not output to stderr', () => {
        expect(consoleErr.length).to.equal(0);
      });
      it('should not output to stdout', () => {
        expect(consoleOut.length).to.equal(0);
      });
    });
    describe('when error level is info', () => {
      beforeEach(() => {
        sandbox.stub(config, 'logLevel').value(errLevel.info);
        consoleOut = stdout.inspectSync(() => {
          consoleErr = stderr.inspectSync(() => {
            logger.info(message, error);
          });
        });
      });
      it('it should log error level', () => {
        expect(consoleOut[0]).to.include('[INFO]');
      });
      it('it should log message', () => {
        expect(consoleOut[0]).to.include(message);
      });
      it('it should log error message', () => {
        expect(consoleOut[0]).to.include(error.message);
      });
    });
    describe('when error level is debug', () => {
      beforeEach(() => {
        sandbox.stub(config, 'logLevel').value(errLevel.debug);
        consoleOut = stdout.inspectSync(() => {
          logger.info(message, error);
        });
      });
      it('it should log output', () => {
        expect(consoleOut.length).to.equal(1);
      });
    });
  });
  describe('.debug', () => {
    const error = new Error(`error${testRandom(1000000)}`);
    const message = `message${testRandom(1000000)}`;
    describe('when error level is error', () => {
      beforeEach(() => {
        sandbox.stub(config, 'logLevel').value(errLevel.error);
        consoleOut = stdout.inspectSync(() => {
          consoleErr = stderr.inspectSync(() => {
            logger.debug(message, error);
          });
        });
      });
      it('should not output to stderr', () => {
        expect(consoleErr.length).to.equal(0);
      });
      it('should not output to stdout', () => {
        expect(consoleOut.length).to.equal(0);
      });
    });
    describe('when error level is warn', () => {
      beforeEach(() => {
        sandbox.stub(config, 'logLevel').value(errLevel.warn);
        consoleOut = stdout.inspectSync(() => {
          consoleErr = stderr.inspectSync(() => {
            logger.debug(message, error);
          });
        });
      });
      it('should not output to stderr', () => {
        expect(consoleErr.length).to.equal(0);
      });
      it('should not output to stdout', () => {
        expect(consoleOut.length).to.equal(0);
      });
    });
    describe('when error level is info', () => {
      beforeEach(() => {
        sandbox.stub(config, 'logLevel').value(errLevel.info);
        consoleOut = stdout.inspectSync(() => {
          consoleErr = stderr.inspectSync(() => {
            logger.debug(message, error);
          });
        });
      });
      it('should not output to stderr', () => {
        expect(consoleErr.length).to.equal(0);
      });
      it('should not output to stdout', () => {
        expect(consoleOut.length).to.equal(0);
      });
    });
    describe('when error level is debug', () => {
      beforeEach(() => {
        sandbox.stub(config, 'logLevel').value(errLevel.debug);
        consoleOut = stdout.inspectSync(() => {
          consoleErr = stderr.inspectSync(() => {
            logger.debug(message, error);
          });
        });
      });
      it('it should log error level', () => {
        expect(consoleOut[0]).to.include('[DEBUG]');
      });
      it('it should log message', () => {
        expect(consoleOut[0]).to.include(message);
      });
      it('it should log error message', () => {
        expect(consoleOut[0]).to.include(error.message);
      });
    });
  });
  describe('timer', () => {
    describe('when the request to end is called', () => {
      let timeStub;
      let timeEndStub;
      beforeEach(() => {
        sandbox.stub(config, 'logLevel').value(errLevel.debug);
        timeStub = sandbox.stub(console, 'time');
        timeEndStub = sandbox.stub(console, 'timeEnd');
        logger.timer('test-timer', 'start');
        logger.timer('test-timer', 'end');
      });
      it('logs start to stdout', () => {
        expect(timeStub.getCalls()[0].args[0]).to.include('test-timer');
      });
      it('logs end to stdout', () => {
        expect(timeEndStub.getCalls()[0].args[0]).to.include('test-timer');
      });
    });
    describe('when the error level is WARN', () => {
      beforeEach(() => {
        sandbox.stub(config, 'logLevel').value(errLevel.warn);
      });
      it('Does not log', () => {
        consoleOut = stdout.inspectSync(() => {
          logger.timer('test-timer', 'start');
          logger.timer('test-timer', 'end');
        });
        // eslint-disable-next-line no-unused-expressions
        expect(consoleOut[0]).to.be.undefined;
      });
    });
  });
  describe('timeStart and timeEnd', () => {
    describe('when timeEnd is invoked', () => {
      let duration = -1;
      beforeEach(() => {
        sandbox.stub(config, 'logLevel').value(errLevel.debug);
        consoleOut = stdout.inspectSync(() => {
          consoleErr = stderr.inspectSync(() => {
            logger.timeStart('example', 'test-action');
            duration = logger.timeEnd('example', 'test-action');
          });
        });
      });
      it('logs to stdout', () => {
        expect(consoleOut[0]).to.include('example');
        expect(consoleOut[0]).to.include('test-action');
        expect(duration).to.not.equal(-1);
      });
    });
  });
  describe('if there is no entry matching parameters exists', () => {
    beforeEach(() => {
      sandbox.stub(config, 'logLevel').value(errLevel.debug);
    });
    it('throws an error', () => {
      expect(() => logger.timeEnd('dummy', 'end')).to.throw();
    });
  });
  describe('if error level is WARN', () => {
    let duration = -1;
    beforeEach(() => {
      sandbox.stub(config, 'logLevel').value(errLevel.warn);
      consoleOut = stdout.inspectSync(() => {
        logger.timeStart('example', 'test-action');
        duration = logger.timeEnd('example', 'test-action');
      });
    });
    it('Does not log', () => {
      // eslint-disable-next-line no-unused-expressions
      expect(consoleOut[0]).to.be.undefined;
      expect(duration).to.not.equal(-1);
    });
  });
});
