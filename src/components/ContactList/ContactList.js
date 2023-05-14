import PropTypes from 'prop-types';
import { ContactListItem } from '../ContactListItem/ContactListItem';
import css from './ContactList.module.css';

export const ContactList = ({ renderList, onDeleteContact }) => {
  return (
    <ul className={css.contact__list}>
      {renderList.map(renderListItem => (
        <ContactListItem
          key={renderListItem.id}
          transferRenderListItem={renderListItem}
          transferOnDeleteContact={onDeleteContact}
        />
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  onDeleteContact: PropTypes.func.isRequired,
  renderList: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};
