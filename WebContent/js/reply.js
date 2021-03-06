function replyDelete(replyId){
		
				
				$.ajax({
					type: "post",
					url: "/blog/reply?cmd=deleteProc",
					data: "replyId=" +replyId,
					contentType: "application/x-www-form-urlencoded; charset=utf-8",
					dataType: "text"
				}).done(function(result){
					if(result == "1"){
						alert("댓글 삭제 성공");
						var replyItem = $("#reply-" + replyId);
						replyItem.remove();						
					} else {
						alert("댓글 삭제 실패");
					}
						
					
				}).fail(function(error){
					alert("댓글 삭제 실패");
				});
			}
		// remove <li>까지 element 다 날림
 		// emtpy element <li> 살아있고 안에 있는거 비움


   // requestgetParameter로 못받고 버퍼로 받아야되는데 받을 수 있게 만들어보는것
   // key=value 형태로 보내면 getParameter로 받을 수 있음
   // 일반적으로 JSON으로 보내고 JSON으로 받아야된다




function replyWrite(boardId, userId){
		
			if(userId === undefined){
				alert("로그인이 필요합니다.");
				return;
				
			}
		
				var data = {
					boardId: boardId,
					userId: userId,
					content: $("#reply__write__form").val()
				};
				
				$.ajax({
					type: "post",
					url: "/blog/reply?cmd=writeProc",
					data: JSON.stringify(data),
					contentType: "application/json; charset=utf-8",
					dataType: "json"
				}).done(function(result){
					if(result == -1 || result == 0){
						alert("댓글 작성 실패");
					}else{
						alert("댓글 작성 성공");
						$("#reply__list").empty();
						console.log(result);
						renderReplyList(result);
						$("#reply__write__form").val("");
					}
				}).fail(function(error){
					alert("댓글 작성 실패");
				});
			}

			function renderReplyList(replyDtos){
				for(var replyDto of replyDtos){
					$("#reply__list").append(makeReplyItem(replyDto));
				}
			}

			function makeReplyItem(replyDto){
				var replyItem = `<li class="media">`;
				if(replyDto.userProfile == null){
					replyItem += `<img src="/blog/image/userProfile.png" class="img-circle">`;	
				}else{
					replyItem += `<img src="${replyDto.userProfile}" class="img-circle">`;
				}
				
				replyItem += `<div class="media-body">`;
				replyItem += `<strong class="text-primary">${replyDto.username}</strong>`;
				replyItem += `<p>${replyDto.reply.content}</p>`;
				replyItem += `</div>`;
				replyItem += `</li>`;
				return replyItem;
			}