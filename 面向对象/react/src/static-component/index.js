import React from 'react';
import styles from './static-component.css';
// export default () => React.DOM.p(null, 'Static content.');
// export default () => <p>Static content.</p>;
export default () => <p className={styles.p}>Static content.</p>;
