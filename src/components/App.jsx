import React, { Component } from 'react';
import { nanoid } from 'nanoid';

import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import css from '../components/App.module.css';

export class App extends Component {
  state = {
    contacts: [
      // { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      // { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      // { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      // { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(_, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  formSubmitHandler = ({ name, number }) => {
    const contact = { id: nanoid(), name, number };

    this.setState(prevState => ({
      contacts: [...prevState.contacts, contact],
    }));
  };

  filterChangeHandler = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getFoundContacts = () => {
    const { contacts, filter } = this.state;

    const filterToLowerCase = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterToLowerCase)
    );
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const { filter } = this.state;

    const foundContacts = this.getFoundContacts();

    return (
      <div className={css.phonebook__section}>
        <h1 className={css.phonebook__title}>Phonebook</h1>
        <ContactForm
          onFormSubmit={this.formSubmitHandler}
          existingContacts={this.state.contacts}
        />
        <h2 className={css.contacts__title}>Contacts</h2>
        <Filter filterData={filter} filterChange={this.filterChangeHandler} />
        <ContactList
          renderList={foundContacts}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
