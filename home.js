(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.ChemistryHome=api;})(typeof self!=='undefined'?self:this,function(){
  'use strict';
  const normalize=value=>String(value).normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/ł/g,'l').toLowerCase().trim();
  function filterTopics(groups,query='',groupId='all'){
    const needle=normalize(query);
    return groups.flatMap((group,index)=>group.topics.map(topic=>({...topic,groupIndex:index,groupRu:group.titleRu,groupPl:group.titlePl}))).filter(topic=>(groupId==='all'||String(topic.groupIndex)===groupId)&&normalize([topic.titleRu,topic.titlePl,topic.noteRu,topic.notePl,topic.groupRu,topic.groupPl].join(' ')).includes(needle));
  }
  function verifiedCount(elements,stats){return elements.filter(item=>stats?.[item.symbol]?.verified===true).length;}
  return {filterTopics,verifiedCount};
});
