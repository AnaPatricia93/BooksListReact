import React from 'react'
import { Container, Button, Table, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo, faPlus, faRecycle } from '@fortawesome/free-solid-svg-icons';
import bookService from '../../services/book';
import SubmitDialogComponent from '../../components/books/SubmitDialog';

export default class BookListPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            error: undefined,
            toCreate: false
        };
    }

    componentDidMount() {
        this.getList();
    }

    getList() {
        bookService.getAll()
            .then(value => this.setState({ books: value }))
            .catch(err => this.setState({ error: err }));
    }

    resetList() {
        bookService.reset().then(() => this.getList());
    }

    // Button onClick history push -> força a ir para a rota que queremos e envia o id para a rota (:id)
    render() {
        const { books, error, toCreate } = this.state;

        return <Container>
            {error !== undefined &&
                <Alert variant="danger">
                    {error}
                </Alert>}

            <Button variant="outline-primary" style={{ margin: '10px 0' }} onClick={() => this.setState({ toCreate: true })}>
                <FontAwesomeIcon icon={faPlus} />&nbsp;Add New Book
            </Button>&nbsp;

            <Button variant="outline-primary" style={{ margin: '10px 0' }} onClick={() => this.resetList()}>
                <FontAwesomeIcon icon={faRecycle} />&nbsp;
            </Button>

            <SubmitDialogComponent
                show={toCreate}
                handleClose={() => this.setState({ toCreate: false })}
                submited={createdBook => this.setState({ books: [...books, createdBook], toCreate: false })}
            />
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {books.map((book, index) => (
                        <tr key={`books${index}`}>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td><Button variant="outline-primary" onClick={() => this.props.history.push(`/book/details/${book._id}`)}       >
                                <FontAwesomeIcon icon={faInfo} />
                            </Button>
                            </td>
                        </tr>))}
                </tbody>
            </Table>
        </Container>
    }
}