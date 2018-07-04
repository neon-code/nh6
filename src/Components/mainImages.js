import React from 'react';
import '../CSS/primary.css';
import { Button, Image, Icon, Label, Header, Modal } from 'semantic-ui-react';

var fileDir = [
    { fileName: './50images/n01537544_103.JPEG', id: "n01537544" },
    { fileName: './50images/n01629819_362.JPEG', id: "n01629819" },
    { fileName: './50images/n01677366_879.JPEG', id: "n01677366" },
    { fileName: './50images/n01694178_12.JPEG', id: "n01694178" },
    { fileName: './50images/n01695060_334.JPEG', id: "n01695060" },
    { fileName: './50images/n01735189_46.JPEG', id: "n01735189" },
    { fileName: './50images/n01773157_182.JPEG', id: "n01773157" },
    { fileName: './50images/n01820546_102.JPEG', id: "n01820546" },
    { fileName: './50images/n01872401_16.JPEG', id: "n01872401" },
    { fileName: './50images/n01873310_70.JPEG', id: "n01873310" },
    { fileName: './50images/n02009912_308.JPEG', id: "n02009912" },
    { fileName: './50images/n02085620_288.JPEG', id: "n02085620" },
    { fileName: './50images/n02091244_3240.JPEG', id: "n02091244" },
    { fileName: './50images/n02096294_11663.JPEG', id: "n02096294" },
    { fileName: './50images/n02096437_2350.JPEG', id: "n02096437" },
    { fileName: './50images/n02108089_9724.JPEG', id: "n02108089" },
    { fileName: './50images/n02123045_238.JPEG', id: "n02123045" },
    { fileName: './50images/n02138441_58.JPEG', id: "n02138441" },
    { fileName: './50images/n02190166_160.JPEG', id: "n02190166" },
    { fileName: './50images/n02206856_71.JPEG', id: "n02206856" },
    { fileName: './50images/n02236044_367.JPEG', id: "n02236044" },
    { fileName: './50images/n02280649_115.JPEG', id: "n02280649" },
    { fileName: './50images/n02346627_277.JPEG', id: "n02346627" },
    { fileName: './50images/n02443484_27.JPEG', id: "n02443484" },
    { fileName: './50images/n02444819_228.JPEG', id: "n02444819" },
    { fileName: './50images/n02701002_107.JPEG', id: "n02701002" },
    { fileName: './50images/n02808304_172.JPEG', id: "n02808304" },
    { fileName: './50images/n02859443_584.JPEG', id: "n02859443" },
    { fileName: './50images/n02916936_136.JPEG', id: "n02916936" },
    { fileName: './50images/n02939185_150.JPEG', id: "n02939185" },
    { fileName: './50images/n03000247_1224.JPEG', id: "n03000247" },
    { fileName: './50images/n03065424_82.JPEG', id: "n03065424" },
    { fileName: './50images/n03188531_8.JPEG', id: "n03188531" },
    { fileName: './50images/n03291819_187.JPEG', id: "n03291819" },
    { fileName: './50images/n03291819_659.JPEG', id: "n03291819" },
    { fileName: './50images/n03425413_88.JPEG', id: "n03425413" },
    { fileName: './50images/n03485794_1006.JPEG', id: "n03485794" },
    { fileName: './50images/n03595614_576.JPEG', id: "n03595614" },
    { fileName: './50images/n03666591_1916.JPEG', id: "n03666591" },
    { fileName: './50images/n03670208_124.JPEG', id: "n03670208" },
    { fileName: './50images/n03761084_209.JPEG', id: "n03761084" },
    { fileName: './50images/n03781244_646.JPEG', id: "n03781244" },
    { fileName: './50images/n03874293_503.JPEG', id: "n03874293" },
    { fileName: './50images/n03930630_103.JPEG', id: "n03930630" },
    { fileName: './50images/n03930630_140.JPEG', id: "n03930630" },
    { fileName: './50images/n04069434_104.JPEG', id: "n04069434" },
    { fileName: './50images/n04243546_28.JPEG', id: "n04243546" },
    { fileName: './50images/n04330267_533.JPEG', id: "n04330267" },
    { fileName: './50images/n04482393_142.JPEG', id: "n04482393" },
    { fileName: './50images/n04485082_632.JPEG', id: "n04485082" },           
]

var activeIndex = Math.floor(Math.random() * 50), usedImages = [activeIndex], taskDone = 1, flag;
var timeTaken = { minutes: 0, seconds: 0, milsec: 0 }, addTime = [0, 0, 0], avgTime = [], Interval;
var fileName = fileDir[activeIndex].fileName;

export class MainImages extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isopen: false,
            activeNext: false,
            buttonText: "Next Button"
        };
    }

    componentDidMount() {
        alert("* Please disable AdBlock and any other antivirus software before you begin!\n Make sure to \"Allow\" popups/cookies on this app! *");
        this.props.onRef(this)
    }

    updateButton() {
        this.state.activeNext ? this.setState({ activeNext: false }) : this.setState({ activeNext: true })
    }

    OnFinish() {
        //To find the Average time
        let td = taskDone - 1;
        avgTime[0] = addTime[0] / td;
        avgTime[1] = addTime[1] / td;
        avgTime[2] = addTime[2] / td;

        avgTime[1] += (avgTime[0] * 60) % 60;
        avgTime[2] += (avgTime[1] * 100) % 100;

        avgTime[0] = Math.floor(avgTime[0]);
        avgTime[1] = Math.floor(avgTime[1]);
        avgTime[2] = Math.floor(avgTime[2]);

        this.props.onFinish(addTime, avgTime);
    }

    startTimer() {
        timeTaken.milsec++;

        if (timeTaken.milsec > 99) {
            timeTaken.seconds++;
            timeTaken.milsec = 0;
        }

        if (timeTaken.seconds > 59) {
            timeTaken.minutes++;
            timeTaken.seconds = 0;
        }
    }

    startWatch() {
        Interval = setInterval(this.startTimer, 10);
    }

    changeImage() {
        //Pause the StopWatch
        clearInterval(Interval);
        this.updateButton();

        //To pass values to Parent (App.js);
        let t = timeTaken.minutes + ":" + timeTaken.seconds + ":" + timeTaken.milsec;
        this.props.onNextImage(fileDir[activeIndex].fileName, fileDir[activeIndex].id, t);

        //Add the time to find total time take
        addTime[2] += timeTaken.milsec;
        if (addTime[2] > 99) {
            addTime[1] += Math.floor(addTime[2] / 100);
            addTime[2] %= 100;
        }
        addTime[1] += timeTaken.seconds;
        if (addTime[1] > 59) {
            addTime[0] += Math.floor(addTime[1] / 60);
            addTime[1] %= 60;
        }
        addTime[0] += timeTaken.minutes;
        
        //Clear the StopWatch
        timeTaken.milsec = timeTaken.seconds = timeTaken.minutes = 0;

        //Load next image
        taskDone++;
        //Change here to lock the images
        if( taskDone === 50 )
        this.setState({ buttonText: "Finish!" })

        if (taskDone > 50) {
            this.setState({
                isopen: true
            })
        }
        else
            do {
                flag = true;
                activeIndex = Math.floor(Math.random() * 50);

                for (var i = 0; i < usedImages.length; i++)
                    if (usedImages[i] === activeIndex)
                        flag = false;

                if (flag === true) {
                    usedImages.push(activeIndex);
                    fileName= fileDir[activeIndex].fileName;
                }
            } while (flag !== true);

        //Start the Watch
        this.startWatch();
    }

    render() {
        return (
            <div>
                <Image className="imageStyling" src={fileName} />

                <Label style={{ zIndex: "1", position: "fixed", top: "10px", right: '4vw' }} color="teal">
                    {taskDone}/50
                </Label>

                <div className="NextButton" style={{ width: '180px' }} >
                    {this.state.activeNext ?
                        <Button primary animated size='huge' onClick={this.changeImage.bind(this)}>
                            <Button.Content visible> {this.state.buttonText} </Button.Content>
                            <Button.Content hidden>
                                <Icon name='right arrow' />
                            </Button.Content>
                        </Button>
                        :
                        <Button disabled size='huge'>{this.state.buttonText}</Button>
                    }
                </div>

                <Modal open={this.state.isopen} basic dimmer="blurring" style={{ position: "fixed", width: "auto", marginTop: "30vh", marginLeft: "38vw" }}>
                    <Header icon='check square outline' style={{ textAlign: "center" }} content='Task Completed!' />
                    <Modal.Content>
                        <h2> Thank you for your participation! <br />
                            Please download the result. </h2>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='blue' inverted onClick={this.OnFinish.bind(this)}>
                        <Icon name='download icon' /> Download Result
                        </Button>
                    </Modal.Actions>
                </Modal>
            </div>
        );
    }
}