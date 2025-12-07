/**
 * LOGO Interpreter
 * Parses and executes LOGO commands
 */

export class LogoInterpreter {
    constructor() {
        this.turtle = null;
        this.variables = {};
        this.procedures = {};
    }

    setTurtle(turtle) {
        this.turtle = turtle;
    }

    async execute(command) {
        if (!this.turtle) {
            throw new Error('Turtle not initialized');
        }

        const trimmed = command.trim();
        if (!trimmed) return;

        const parts = trimmed.split(/\s+/);
        const cmd = parts[0].toUpperCase();

        try {
            switch (cmd) {
                case 'FD':
                case 'FORWARD':
                    await this.turtle.forward(parseFloat(parts[1]) || 0);
                    break;

                case 'BK':
                case 'BACK':
                case 'BACKWARD':
                    await this.turtle.backward(parseFloat(parts[1]) || 0);
                    break;

                case 'RT':
                case 'RIGHT':
                    await this.turtle.right(parseFloat(parts[1]) || 0);
                    break;

                case 'LT':
                case 'LEFT':
                    await this.turtle.left(parseFloat(parts[1]) || 0);
                    break;

                case 'PU':
                case 'PENUP':
                    this.turtle.penUp();
                    break;

                case 'PD':
                case 'PENDOWN':
                    this.turtle.penDown();
                    break;

                case 'PE':
                case 'PENERASE':
                    this.turtle.penErase();
                    break;

                case 'PPT':
                case 'PENPAINT':
                    this.turtle.penPaint();
                    break;

                case 'CS':
                case 'CLEARSCREEN':
                    await this.turtle.clearScreen();
                    break;

                case 'HOME':
                    await this.turtle.home();
                    break;

                case 'HT':
                case 'HIDETURTLE':
                    this.turtle.hideTurtle();
                    break;

                case 'ST':
                case 'SHOWTURTLE':
                    this.turtle.showTurtle();
                    break;

                case 'SETXY':
                    if (parts.length >= 3) {
                        await this.turtle.setXY(parseFloat(parts[1]), parseFloat(parts[2]));
                    }
                    break;

                case 'SETH':
                case 'SETHEADING':
                    if (parts.length >= 2) {
                        await this.turtle.setHeading(parseFloat(parts[1]));
                    }
                    break;

                case 'SETPC':
                case 'SETPENCOLOR':
                    if (parts.length >= 2) {
                        this.turtle.setPenColor(parts[1]);
                    }
                    break;

                case 'SETPENSIZE':
                case 'SETSW':
                    if (parts.length >= 2) {
                        this.turtle.setPenSize(parseFloat(parts[1]));
                    }
                    break;

                case 'PR':
                case 'PRINT':
                    console.log(parts.slice(1).join(' '));
                    break;

                case 'REPEAT':
                    await this.handleRepeat(trimmed);
                    break;

                case 'TO':
                    await this.handleProcedure(trimmed);
                    break;

                case 'MAKE':
                    await this.handleMake(trimmed);
                    break;

                default:
                    throw new Error(`Unknown command: ${cmd}`);
            }
        } catch (error) {
            throw new Error(`Error executing ${cmd}: ${error.message}`);
        }
    }

    async handleRepeat(command) {
        const match = command.match(/REPEAT\s+(\d+)\s+\[(.*?)\]/i);
        if (!match) {
            throw new Error('Invalid REPEAT syntax. Use: REPEAT n [commands]');
        }

        const count = parseInt(match[1]);
        const commands = match[2].trim();

        for (let i = 0; i < count; i++) {
            await this.execute(commands);
        }
    }

    async handleProcedure(command) {
        // Simple procedure definition - store for later execution
        // This is a basic implementation
        const lines = command.split('\n');
        if (lines.length < 2) {
            throw new Error('Procedure definition incomplete');
        }
        // For now, just acknowledge it
        console.log('Procedure definition noted');
        // Note: Procedures are not currently stored, so executeProcedure is unreachable
    }

    async handleMake(command) {
        const match = command.match(/MAKE\s+"?(\w+)"?\s+(.+)/i);
        if (!match) {
            throw new Error('Invalid MAKE syntax. Use: MAKE "var value');
        }

        const varName = match[1];
        let value = match[2].trim();

        // Try to parse as number
        const numValue = parseFloat(value);
        if (!isNaN(numValue)) {
            this.variables[varName] = numValue;
        } else {
            this.variables[varName] = value;
        }
    }

}

