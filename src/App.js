import React, { useState } from 'react';
import moment from 'moment';

function DateTime(props) {
    return (
        <p className="date">{props.date}</p>
    )
}

function DateTimePretty(Component, dateFormater) {
    return (props) => {
        const date = dateFormater(props.date)
        return <Component {...props} date={date} />
    }
}

function dateFormater(date) {
    const now = moment(Date.now())
    const parsedDate = moment(date)
    const diff = now.diff(parsedDate, 'hours')
    const day = (diff / 24).toFixed(0)
    if (diff < 1) {
        const min = (diff * 60).toFixed(0)
        return `${min} минут назад`
    }
    if (diff > 1 && diff < 24) {
        const hour = diff.toFixed(0)
        return `${hour} часов назад`
    }
    return `${day} дней назад`
}

const WithFormatDateTime = DateTimePretty(DateTime, dateFormater)

function Video(props) {
    return (
        <div className="video">
            <iframe src={props.url} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
            {/* <DateTime date={props.date} /> */}
            <WithFormatDateTime date={props.date} />
        </div>
    )
}

function VideoList(props) {
    return props.list.map(item => <Video key={item.url} url={item.url} date={item.date} />);
}

export default function App() {
    const [list, setList] = useState([
        {
            url: 'https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2020-06-09 15:24:00'
        },
        {
            url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-03-03 12:10:00'
        },
        {
            url: 'https://www.youtube.com/embed/xGRjCa49C6U?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-02-03 23:16:00'
        },
        {
            url: 'https://www.youtube.com/embed/RK1K2bCg4J8?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2020-06-09 12:10:00'
        },
        {
            url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-01-01 16:17:00'
        },
        {
            url: 'https://www.youtube.com/embed/TxbE79-1OSI?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2017-12-02 05:24:00'
        },
    ]);

    return (
        <VideoList list={list} />
    );
}