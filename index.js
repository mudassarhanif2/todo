#! usr/bin/env node
import inquirer from "inquirer";
let repeat = true;
async function repeatAgain() {
    let ans = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'again',
            message: 'would you like another operation? '
        }
    ]);
    if (!(ans.again)) {
        console.clear();
        console.log('Thank you for using "todo" application');
        repeat = false;
    }
}
let todo = [];
async function TodoList() {
    do {
        const answer = await inquirer.prompt([
            {
                type: 'list',
                name: 'options',
                message: 'What do you want?',
                default: true,
                choices: ['Add Item', 'Remove Item', 'Display Items']
            },
            {
                type: 'input',
                name: 'addItem',
                message: 'Enter new Item',
                when(answers) {
                    return answers.options == 'Add Item';
                },
                validate(value) {
                    if (value) {
                        todo.push(value);
                        return true;
                    }
                    else {
                        return 'Please enter something to add.';
                    }
                }
            },
            {
                type: 'input',
                name: 'remove',
                message: 'enter the item you want to remove',
                validate(value) {
                    let index = todo.indexOf(value);
                    if (value && index != -1) {
                        todo.splice(index, 1);
                        return true;
                    }
                    else {
                        return 'Please enter a valid item';
                    }
                },
                when(answers) {
                    return answers.options == 'Remove Item';
                },
            },
            {
                when(answers) {
                    if (answers.options == 'Display Items' && todo.length) {
                        console.log('   Your todo items are:');
                        todo.forEach(item => console.log("    >>" + item));
                    }
                    else {
                        console.log('You have nothing todo');
                    }
                }
            }
        ]);
        console.log(todo);
        await repeatAgain();
    } while (repeat);
}
TodoList();
