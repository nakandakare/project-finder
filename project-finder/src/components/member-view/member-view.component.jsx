import React from 'react';
import './member-view.styles.scss';
import { Icon, Item } from 'semantic-ui-react'

const MemberView = ({ id, name, project_owner, img }) => {

    return (
        <Item>
            <Item.Image size='tiny' src={img} />
            <Item.Content verticalAlign='middle'>
                <Item.Header>
                    {
                        project_owner ? <Icon title='Project Leader' name='chess king' /> : null
                    }
                    {name}
                </Item.Header>
            </Item.Content>
        </Item>
    )
}

export default MemberView;