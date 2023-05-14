import PropTypes from 'prop-types';
import css from './ContactListItem.module.css';

export const ContactListItem = ({
  transferRenderListItem: { id, name, number },
  transferOnDeleteContact,
}) => (
  <li>
    <div>
      <p>
        {name}:<span>{number}</span>
      </p>
      <button
        className={css.item__button}
        type="button"
        onClick={() => transferOnDeleteContact(id)}
      >
        Delete
      </button>
    </div>
  </li>
);

ContactListItem.propTypes = {
  transferOnDeleteContact: PropTypes.func.isRequired,
  transferRenderListItem: PropTypes.exact({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }).isRequired,
};
