


var SectionLink = React.createClass({
    render: function(){
    var contentLink;
    var templateLink;
    if(this.props.contentLink.length == 0){
        contentLink = " [New Page] ";
    }
    else{
        contentLink = <a href={this.props.contentLink} target="_blank"> [Current URL] </a>;
    }
    if(this.props.templateLink.length == 0){
        templateLink = "";
    }
    else{
        templateLink = <a href={this.props.templateLink} target="_blank"> [Template URL] </a>;
    }
        return (
            <div>{this.props.title}
                {contentLink}
                <a href={this.props.instructions} target="_blank">[Instructions] </a>
               {templateLink}
            </div>
        )
    }
});

var Navigation = React.createClass({

    render: function(){
        return(
        <ul>
            {
                this.props.items.map(function(item) {
                    if(item.items.length == 0)
                        return <li><SectionLink  title={item.title} contentLink={item.CL} instructions={item.GL} templateLink={item.TL}/></li>
                    else
                        return (
                        <li><SectionLink  title={item.title} contentLink={item.CL} instructions={item.GL} templateLink={item.TL}/>
                        <Navigation items={item.items}/>
                        </li>
                        )
                })
            }
        </ul>
        )
    }

});

var Menu = React.createClass({
getInitialState: function(){
     return {

       items: [
       {title:"About Us", CL:"http://www.uml.edu/Sustainability/About-Us.aspx", TL:"http://www.uml.edu/CampusRecreation/About-Us/default.aspx" ,GL:"https://docs.google.com/document/d/1VMbwZy3u_9YmcRJlqugZtXeV2_RQnvprh10C10yr15Q/edit?usp=sharing" ,items: [
            {title:"Meet the Team", CL:"http://www.uml.edu/Sustainability/Contact-Us.aspx ", TL:"" ,GL:"https://docs.google.com/document/d/1_jBj-_tipEWHQt62ukG18vMPjRFThwSjGDq36g5kEc0/edit?usp=sharing", items: []}
       ]},
       {title:"Planning, Administration & Reporting", CL:"http://www.uml.edu/Sustainability/Climate-Action-Plan/default.aspx", TL:"" , GL:"https://docs.google.com/document/d/1fnclXMFavHj_UjbHpujKMSiYOkiRJZd-Nx0m6Z3ZD9E/edit?usp=sharing",items: [
            {title:"2020 Committee for Sustainability", CL:"http://www.uml.edu/2020/2020-Commission/Sustainability.aspx", TL:"" ,GL:"https://docs.google.com/document/d/1HY2l1E1cETa9_7IxXbt8QbKmzO_GFZEMU4QFz62Eekg/edit?usp=sharing", items: []},
            {title:"AASHE STARS", CL:"", TL:"" ,GL:"https://docs.google.com/document/d/1TXmtBgaZdnHQhl2Uw_2h1RuRKo3CRRccxh1Bv_S7JZw/edit?usp=sharing", items: []},
            {title:"ACUPCC", CL:"", TL:"" ,GL:"https://docs.google.com/document/d/1tHZER1NtJIjo2ZdHaZMnCuqJUHNidUyxco81Y9KmZEE/edit?usp=sharing", items: []},
            {title:"CAP & Interim Reports", CL:"", TL:"" ,GL:"https://docs.google.com/document/d/1HZ2EDLU_KDcPa-Pn-Ij-9liycNL4u-hzcydaH4SdeWo/edit?usp=sharing", items: []},
            {title:"CAP Implementation Committees", CL:"", TL:"" ,GL:"https://docs.google.com/document/d/16kf_bdGt-gH12lr00sdmQv6z8Poqj_t6ZV5eXbBrVpg/edit?usp=sharing", items: [
                {title:"Steering Committee", CL:"", TL:"" , GL:"https://docs.google.com/document/d/1vrulptfjgyHWyhP8J7N87EpzOG54v-LjYdzFA8YLkyE/edit?usp=sharing",items: []},
                {title:"Academic", CL:"", TL:"" , GL:"https://docs.google.com/document/d/1xqNW162tdA-zGMfG1SaYo4V5rivOtLlTQWp63rhfSUA/edit?usp=sharing", items: []},
                {title:"Administration & Finance", CL:"", TL:"" ,GL:"https://docs.google.com/document/d/1Z9umX2Y0BOIRNMD_P42p7yANCMaHvh3oHCmc4jNd3pw/edit?usp=sharing", items: []},
                {title:"Communications", CL:"", TL:"" ,GL:"https://docs.google.com/document/d/1C_WfshGRdGlkShDu-HGH4qXRPoP9jcR7XMoTYGYG4t4/edit?usp=sharing", items: []},
                {title:"Energy Projects", CL:"", TL:"" ,GL:"https://docs.google.com/document/d/1-3Jk1MemSK4V_k0xRXAwwXGQeffo040cKgSB4SLIcWg/edit?usp=sharing", items: []},
                {title:"Student Life", CL:"", TL:"" ,GL:"https://docs.google.com/document/d/1c4rPnSvXkTmtXIiQijbgGTytNgxbRNR6bMexYTlZFc4/edit?usp=sharing", items: []},
                {title:"Sustainability", CL:"", TL:"" ,GL:"https://docs.google.com/document/d/1IiDwN8bMM8rFogSFtWiy8qtgiKo94PHaZxFLkDB52xs/edit?usp=sharing", items: []},
                {title:"Transportation", CL:"https://stage.uml.edu/student-services/Transportation-Services/Sustainable-Transportation/transportation-options-default.aspx", TL:"" ,GL:"https://docs.google.com/document/d/1MS3C2eBif6vdIADT2QzAcVfO1vhaisDX-QpDuEIFdcc/edit?usp=sharing", items: []}
            ]},
       ]},
       {title:"Engagement & Partnerships", CL:"", TL:"" ,GL:"https://docs.google.com/document/d/1jttiFWN1UqTjMt-e_cXmJZ_FXs7xmLlizfZxLZZ7dgg/edit?usp=sharing", items: [
                {title:"Student Engagement", CL:"http://www.uml.edu/EEM/Environmental-Stewardship/Events/default.aspx", TL:"" ,GL:"https://docs.google.com/document/d/1AUIY1ZHX8rd-pO2Iy9OiGDuAxfa0XLq0Dg-tcB7Hzws/edit?usp=sharing", items: []},
                {title:"Employee Engagement", CL:"http://www.uml.edu/EEM/Environmental-Stewardship/Community-Engagement/default.aspx", TL:"" ,GL:"https://docs.google.com/document/d/1u_lQSRlWk9TXOSeyzq794dMTHRPHsmFrSylj4SlDFTE/edit?usp=sharing", items: []},
                {title:"Partnerships ", CL:"", TL:"" ,GL:"https://docs.google.com/document/d/1lLUZKkWOILkhT4y7AVC2fbeCJaff70HW6BuVkTcjeAc/edit?usp=sharings", items: []}
        ]},
        {title:"Academics & Research", CL:"http://www.uml.edu/Sustainability/Academic-reasearch.aspx", TL:"" ,GL:"https://docs.google.com/document/d/1aOuL8v5XIPWjWBVDJMWHX2XwCWoNxPv_dlhtdMhn0TA/edit?usp=sharing", items: [
                {title:"Academic Programs", CL:"http://www.uml.edu/Research/Climate-Change/Academic-Programs.aspx", TL:"" ,GL:"https://docs.google.com/document/d/1mV-lVJ4D9y2sHYxVdvbsT_B_OIffF8DRiB6dgjwuTlM/edit?usp=sharing", items: []},
                {title:"Campus as a Living Laboratory", CL:"", TL:"" ,GL:"https://docs.google.com/document/d/1mFN6Lsq9gdTExDceaPovHXRQ4hs3bsz3AH1hPTKO3YU/edit?usp=sharing", items: []},
                {title:"Climate Change Initiative", CL:"http://www.uml.edu/Research/Climate-Change/default.aspx", TL:"" ,GL:"https://docs.google.com/document/d/15jf9Bf45y6Nfejwsv5HzK6tm70pGmt2NiDW1Nujo9nQ/edit?usp=sharing", items: []},
                {title:"Courses", CL:"http://www.uml.edu/Research/Climate-Change/Academic-Programs.aspx", TL:"" ,GL:"https://docs.google.com/document/d/162GahIxsgJvpOYOMbYLPWsa_UKsxLqfwS-bmVgQRWgs/edit?usp=sharing", items: []},
                {title:"Research", CL:"", TL:"" ,GL:"https://docs.google.com/document/d/1mlaR4fK91pkYE5JhtUtqAvAqpGxqlJhVQfkmM4bMAR0/edit?usp=sharing", items: []}
        ]},
        {title:"Campus Operations", CL:"", TL:"" ,GL:"https://docs.google.com/document/d/1tFybaI--xoC37zlcYzyfiqexFAw4Q2_4EYQTym9nJ84/edit?usp=sharing", items: [
                {title:"Air and Climate", CL:"", TL:"" , GL:"https://docs.google.com/document/d/1Faecfjz5qTVchI2aPxsO9bzNv5roFcetlcoyYexJjOk/edit?usp=sharing",items: []},
                {title:"Buildings", CL:"", TL:"", GL:"https://docs.google.com/document/d/1h4B84zNDZC1UhbvTr35Wqmi83HuJOHLVPq0ZBEYdZ6U/edit?usp=sharing", items: []},
                {title:"Dining Services", CL:"", TL:"" ,GL:"https://docs.google.com/document/d/1nyVRWDjhnzlE-BmJMjPnh7GWP-00R198sH07JY9C-kg/edit?usp=sharing", items: []},
                {title:"Energy", CL:"", TL:"" ,GL:"https://docs.google.com/document/d/1TSAKc7ruW9cpih2qF-s8kjRLmCpNEDftM6R8JhcuWCw/edit?usp=sharing", items: []},
                {title:"Grounds", CL:"", TL:"" ,GL:"https://docs.google.com/document/d/1Cm_xPGBIW1_2KNOz6QVf35cia3gvuchCor9fwX3Bw3c/edit?usp=sharing", items: []},
                {title:"Purchasing", CL:"", TL:"" ,GL:"https://docs.google.com/document/d/1MfESlog0NsGiu3lg0Lb5XW_FojE0Qc0OTT61DMrGQ6Q/edit?usp=sharing", items: []},
                {title:"Transportation", CL:"", TL:"" ,GL:"https://docs.google.com/document/d/1mkri3g_Vfo02tg9mq9MVGFxo_DV18apC1fYZXMElIjo/edit?usp=sharing", items: []},
                {title:"Waste", CL:"", TL:"" ,GL:"https://docs.google.com/document/d/1SkGTlZbReMc3piRf8o0aZyu8gMLFDYueb3N_a7qLj-U/edit?usp=sharing", items: []},
                {title:"Water", CL:"", TL:"" ,GL:"https://docs.google.com/document/d/1Tbjkfae00rLQtoSAP483S9xgCgrdVFPY2h_MU5z-RZ0/edit?usp=sharing", items: []}
        ]},
        {title:"News & Events", CL:"", TL:"" ,GL:"https://docs.google.com/document/d/1I9hFZBZUQLwtGM4bVqfGzdd55JMOW0hTE2lD3fKjnd4/edit?usp=sharing", items: []},
        {title:"Awards & Recognitions", CL:"http://www.uml.edu/Sustainability/Recognition.aspx", TL:"" ,GL:"https://docs.google.com/document/d/19mzUS-ps8d4n5kLErLUK3Eqqkrjyr8SUw-43jhQSv-0/edit?usp=sharing", items: []},
        {title:"Contact & Connect", CL:"http://www.uml.edu/Sustainability/Contact-Us.aspx", TL:"" ,GL:"https://docs.google.com/document/d/1ZM8yB6sKEoD-py4aQYfTZodBnql33xmpO0wRM-rRS4Q/edit?usp=sharing", items: []}

       ]
     }
  },

  componentWillMount: function(){
    this.setState({items: this.state.items})
  },
  render: function(){
    return (
      <Navigation items={this.state.items}/>

    );
  }
});

React.render(<Menu/>, document.getElementById('reactApp'));
