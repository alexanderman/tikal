import React from 'react';
import './table.scss';

function getClassName(item) {
    if (item.closest)
        return 'closest';
    if (item.farthest)
        return 'farthest';
    return '';
}

export default props => {
    const { meta = [], data = [] } = props;

    return (
        <table className="table" cellSpacing={0} cellPadding={0}>
            <thead>
                <tr>
                    {meta.map((item, i) => 
                    <th key={i} style={item.style}><span>{item.title}</span><div className="divider"></div></th>)
                    }
                </tr>
            </thead>
            <tbody>

                {data.map((dataItem, i) => 
                <tr key={i}>
                    {meta.map((metaItem, i) => 
                    <td key={i} className={getClassName(dataItem)}><span>{dataItem[metaItem.key]}</span></td>)
                    }
                </tr>)
                }

                <tr>
                    <td colSpan={meta.length} className="summary"><span>{data.length} missions</span></td>
                </tr>

            </tbody>
        </table>
    );
}
